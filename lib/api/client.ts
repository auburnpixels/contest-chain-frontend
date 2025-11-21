import { API_BASE_URL, API_TIMEOUT } from '../config';

export interface ApiError {
  code: string;
  message: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

/**
 * API client for CaaS platform
 */
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    
    // Load token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('jwt_token');
    }
  }

  /**
   * Set JWT token for authenticated requests
   */
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt_token', token);
    }
  }

  /**
   * Clear JWT token
   */
  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt_token');
    }
  }

  /**
   * Get current token from localStorage (always fresh)
   */
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jwt_token');
    }
    return this.token;
  }

  /**
   * Make authenticated request with JWT
   */
  private async fetchWithAuth<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers || {}),
    };

    // Always get the latest token from localStorage
    const currentToken = this.getToken();
    console.log('[API Client] Token present:', !!currentToken, 'Endpoint:', endpoint);
    if (currentToken) {
      headers['Authorization'] = `Bearer ${currentToken}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        
        // Laravel validation error format
        if (response.status === 422 && errorData.errors) {
          const error: any = new Error(errorData.message || 'Validation failed');
          error.validationErrors = errorData.errors;
          error.status = 422;
          throw error;
        }
        
        // Authentication errors
        if (response.status === 401) {
          const error: any = new Error(errorData.error?.message || errorData.message || 'Unauthorized');
          error.status = 401;
          error.code = errorData.error?.code;
          throw error;
        }
        
        // Other API errors
        const error: any = new Error(errorData.error?.message || errorData.message || 'Request failed');
        error.status = response.status;
        error.code = errorData.error?.code;
        throw error;
      }

      return await response.json();
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      // Network errors
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.fetchWithAuth<T>(endpoint, { method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.fetchWithAuth<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.fetchWithAuth<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.fetchWithAuth<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

/**
 * Auth API
 */
export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<{ access_token: string; user: any }>('/internal/auth/login', {
      email,
      password,
    }),

  register: (operatorName: string, email: string, password: string, passwordConfirmation: string) =>
    apiClient.post<{ access_token: string; user: any; operator: any }>('/internal/auth/register', {
      operator_name: operatorName,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }),

  logout: () => apiClient.post<{ message: string }>('/internal/auth/logout'),

  refresh: () =>
    apiClient.post<{ access_token: string; user: any }>('/internal/auth/refresh'),

  me: () => apiClient.get<{ user: any }>('/internal/auth/me'),
};

/**
 * Operator Dashboard API
 */
export const operatorApi = {
  getDashboard: () => apiClient.get<any>('/internal/operator/me'),

  updateDetails: (name: string, url?: string) =>
    apiClient.put<any>('/internal/operator/details', { name, url }),

  getCompetitions: () => apiClient.get<any>('/internal/operator/competitions'),

  getCompetition: (uuid: string) =>
    apiClient.get<any>(`/internal/operator/competitions/${uuid}`),
  
  getCompetitionAudits: (uuid: string) =>
    apiClient.get<any>(`/internal/operator/competitions/${uuid}/audits`),
  
  getCompetitionEvents: (uuid: string) =>
    apiClient.get<any>(`/internal/operator/competitions/${uuid}/events`),

  getDrawEvents: (params?: {
    page?: number;
    per_page?: number;
    event_type?: string;
    competition_id?: string;
    actor_type?: string;
    from_date?: string;
    to_date?: string;
  }) => {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    return apiClient.get<any>(`/internal/operator/draw-events${queryString ? `?${queryString}` : ''}`);
  },

  getDrawEventsFilters: () =>
    apiClient.get<any>('/internal/operator/draw-events/filters'),

  getComplianceSummary: () => apiClient.get<any>('/internal/operator/compliance-summary'),

  getApiKeys: () => apiClient.get<any>('/internal/operator/api-keys'),

  createApiKey: (name: string) =>
    apiClient.post<any>('/internal/operator/api-keys', { name }),

  revokeApiKey: (keyId: number) =>
    apiClient.delete<any>(`/internal/operator/api-keys/${keyId}`),
};

/**
 * Regulator Dashboard API
 */
export const regulatorApi = {
  getDashboard: () => apiClient.get<any>('/internal/regulator/compliance-dashboard'),

  getComplianceDashboard: () => apiClient.get<any>('/internal/regulator/compliance-dashboard'),

  getOperators: () => apiClient.get<any>('/internal/regulator/operators'),

  getOperator: (id: number) =>
    apiClient.get<any>(`/internal/regulator/operators/${id}`),
  
  getOperatorCompetitions: (id: number) =>
    apiClient.get<any>(`/internal/regulator/operators/${id}/competitions`),

  getCompetition: (uuid: string) =>
    apiClient.get<any>(`/internal/regulator/competitions/${uuid}`),
  
  getCompetitionAudits: (uuid: string) =>
    apiClient.get<any>(`/internal/regulator/competitions/${uuid}/audits`),
  
  getCompetitionEvents: (uuid: string) =>
    apiClient.get<any>(`/internal/regulator/competitions/${uuid}/events`),

  verifyIntegrity: (competitionUuid?: string) =>
    apiClient.post<any>('/internal/regulator/integrity/verify', {
      competition_uuid: competitionUuid,
    }),
};

/**
 * Public API
 */
export const publicApi = {
  getAudit: (uuid: string) =>
    fetch(`${API_BASE_URL}/api/v1/raffles/${uuid}/audit`).then((r) => r.json()),

  getStats: (uuid: string) =>
    fetch(`${API_BASE_URL}/api/v1/raffles/${uuid}/entries/stats`).then((r) =>
      r.json()
    ),

  getOdds: (uuid: string, entries: number) =>
    fetch(`${API_BASE_URL}/api/v1/raffles/${uuid}/odds?entries=${entries}`).then(
      (r) => r.json()
    ),

  getDrawAudits: (operatorUuid?: string, page?: number) => {
    const params = new URLSearchParams();
    if (operatorUuid) params.append('operator', operatorUuid);
    if (page) params.append('page', page.toString());
    const queryString = params.toString();
    return fetch(`${API_BASE_URL}/api/public/draw-audits${queryString ? `?${queryString}` : ''}`).then((r) => r.json());
  },

  downloadDrawAuditsJson: (operatorUuid?: string) => {
    const params = new URLSearchParams();
    if (operatorUuid) params.append('operator', operatorUuid);
    const queryString = params.toString();
    return fetch(`${API_BASE_URL}/api/public/draw-audits/download${queryString ? `?${queryString}` : ''}`).then((r) => r.json());
  },

  getOperators: () =>
    fetch(`${API_BASE_URL}/api/public/operators`).then((r) => r.json()),
};
