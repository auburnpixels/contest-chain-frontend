import { API_BASE_URL, API_TIMEOUT } from '../config';
import type { MetricResponse } from '@/types/metrics';

export interface ApiError {
  code: string;
  message: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

export interface TicketVerification {
  ticket: {
    external_id: string;
    submitted_at: string;
    is_free_entry: boolean;
    is_eligible: boolean;
    user_reference?: string;
  };
  competition: {
    id: string;
    name: string;
    external_id: string;
    status: string;
  };
  operator: {
    id: string;
    name: string;
  };
  draw_status: {
    has_been_drawn: boolean;
    drawn_at?: string;
    draw_audit_id?: string;
  };
  result: {
    is_winner: boolean;
    prize?: string;
    draw_audit_url?: string;
  };
}

export interface ChainVerification {
  verified_at: string;
  chain_status: 'valid' | 'invalid';
  total_events: number;
  verified_events: number;
  unchained_events: number;
  failed_events: number;
  has_broken_links: boolean;
  has_invalid_hashes: boolean;
}

export interface ApiErrorWithStatus extends Error {
  status?: number;
  code?: string;
  validationErrors?: Record<string, string[]>;
}

export interface PublicCompetition {
  competition: {
    id: string;
    name: string;
    external_id: string;
    status: string;
    draw_at?: string;
    created_at: string;
    prizes: Array<{
      id: string;
      name: string;
      description?: string;
    }>;
  };
  operator: {
    id: string;
    name: string;
    slug: string;
  };
  draw_audits: Array<{
    id: string;
    drawn_at: string;
    total_entries: number;
    prize?: {
      id: string;
      name: string;
    };
    winner?: {
      external_id: string;
    };
    signature_hash: string;
  }>;
  entry_stats: {
    total_entries: number;
    free_entries: number;
    paid_entries: number;
    eligible_entries: number;
    eligibility_rate: number;
  };
  entry_timeline: Array<{
    date: string;
    count: number;
  }>;
  stats: {
    total_entries: number;
    total_draws: number;
    total_complaints: number;
    active_complaints: number;
  };
}

export interface PublicOperator {
  operator: {
    id: string;
    name: string;
    slug: string;
    created_at: string;
  };
  stats: {
    total_competitions: number;
    total_draws: number;
    total_entries: number;
    draw_audit_rate: number;
  };
  recent_competitions: Array<{
    id: string;
    name: string;
    external_id: string;
    status: string;
    draw_at?: string;
    created_at: string;
    total_entries: number;
    total_draws: number;
    total_prizes: number;
  }>;
}

export interface DrawAuditDetail {
  id: string;
  sequence: number;
  draw_id: string;
  drawn_at_utc: string;
  total_entries: number;
  winning_ticket: string | null;
  signature_hash: string;
  previous_signature_hash: string | null;
  pool_hash: string | null;
  rng_seed_or_hash: string;
  created_at: string;
  competition: {
    id: string;
    name: string;
    external_id?: string;
  } | null;
  operator: {
    uuid: string | null;
    name: string;
    slug: string;
    url: string | null;
  } | null;
  prize_name: string | null;
}

/**
 * API client for CaaS platform
 */
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<string> | null = null;

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
   * Refresh JWT token
   */
  private async refreshToken(): Promise<string> {
    // If already refreshing, return the existing promise
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = (async () => {
      try {
        const response = await fetch(`${this.baseUrl}/internal/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error('Token refresh failed');
        }

        const data = await response.json();
        if (!data.access_token) {
          throw new Error('No access token in refresh response');
        }

        this.setToken(data.access_token);
        return data.access_token;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  /**
   * Make authenticated request with JWT
   */
  private async fetchWithAuth<T>(
    endpoint: string,
    options: RequestInit = {},
    isRetry: boolean = false
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // Add any additional headers from options
    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        if (typeof value === 'string') {
          headers[key] = value;
        }
      });
    }

    // Always get the latest token from localStorage
    const currentToken = this.getToken();
    if (!currentToken) {
      console.warn('[API Client] No token available for endpoint:', endpoint);
      // Don't throw error here - let the backend respond with proper 401
    } else {
      console.log('[API Client] Token present for endpoint:', endpoint);
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
          const error = new Error(errorData.message || 'Validation failed') as ApiErrorWithStatus;
          error.validationErrors = errorData.errors;
          error.status = 422;
          throw error;
        }
        
        // Authentication errors - attempt token refresh
        if (response.status === 401) {
          const errorCode = errorData.error?.code;
          
          // Don't try to refresh on these endpoints or if already retried
          const isAuthEndpoint = endpoint.includes('/auth/login') || 
                                 endpoint.includes('/auth/register') ||
                                 endpoint.includes('/auth/refresh');
          
          if (!isAuthEndpoint && !isRetry && (errorCode === 'TOKEN_EXPIRED' || errorCode === 'TOKEN_INVALID')) {
            try {
              console.log('[API Client] Attempting automatic token refresh...');
              await this.refreshToken();
              console.log('[API Client] Token refreshed, retrying request...');
              
              // Retry the original request with new token
              return this.fetchWithAuth<T>(endpoint, options, true);
            } catch (refreshError) {
              console.error('[API Client] Token refresh failed:', refreshError);
              // Clear token and let the error propagate
              this.clearToken();
            }
          }
          
          const error = new Error(errorData.error?.message || errorData.message || 'Unauthorized') as ApiErrorWithStatus;
          error.status = 401;
          error.code = errorCode;
          throw error;
        }
        
        // Other API errors
        const error = new Error(errorData.error?.message || errorData.message || 'Request failed') as ApiErrorWithStatus;
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

  // Metric endpoints
  getMetrics: {
    attention: () => apiClient.get<MetricResponse>('/internal/operator/metrics/attention'),
    chainIntegrity: () => apiClient.get<MetricResponse>('/internal/operator/metrics/chain-integrity'),
    competitions: () => apiClient.get<MetricResponse>('/internal/operator/metrics/competitions'),
    complaints: () => apiClient.get<MetricResponse>('/internal/operator/metrics/complaints'),
    entries: () => apiClient.get<MetricResponse>('/internal/operator/metrics/entries'),
    draws: () => apiClient.get<MetricResponse>('/internal/operator/metrics/draws'),
    events: async (): Promise<MetricResponse> => {
      // Fetch draw events to get total count
      const response = await apiClient.get<any>('/internal/operator/draw-events?per_page=1');
      return {
        value: response.total?.toString() || '0',
        footer: 'All time',
        status: 'neutral',
        metadata: {
          total_events: response.total || 0,
        },
      };
    },
  },

  updateDetails: (name: string, url?: string) =>
    apiClient.put<any>('/internal/operator/details', { name, url }),

  getCompetitions: (params?: {
    page?: number;
    per_page?: number;
    external_id?: string;
    name?: string;
    status?: string;
  }) => {
    const queryString = params ? new URLSearchParams(Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== '') {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)).toString() : '';
    return apiClient.get<any>(`/internal/operator/competitions${queryString ? `?${queryString}` : ''}`);
  },

  getCompetition: (uuid: string) =>
    apiClient.get<any>(`/internal/operator/competitions/${uuid}`),
  
  getCompetitionAudits: (uuid: string) =>
    apiClient.get<any>(`/internal/operator/competitions/${uuid}/audits`),
  
  getCompetitionEvents: (uuid: string) =>
    apiClient.get<any>(`/internal/operator/competitions/${uuid}/events`),

  getEntries: (params?: {
    page?: number;
    per_page?: number;
    competition_id?: string;
    entry_type?: string;
    correct_answer?: string;
    show_deleted?: string;
  }) => {
    const queryString = params ? new URLSearchParams(Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== '') {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)).toString() : '';
    return apiClient.get<any>(`/internal/operator/entries${queryString ? `?${queryString}` : ''}`);
  },

  getDrawEvents: (params?: {
    page?: number;
    per_page?: number;
    event_type?: string;
    competition_id?: string;
    actor_type?: string;
    from_date?: string;
    to_date?: string;
  }) => {
    const queryString = params ? new URLSearchParams(Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== '') {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)).toString() : '';
    return apiClient.get<any>(`/internal/operator/draw-events${queryString ? `?${queryString}` : ''}`);
  },

  getDrawEventsFilters: () =>
    apiClient.get<any>('/internal/operator/draw-events/filters'),

  getAttentionSummary: () => apiClient.get<any>('/api/v1/operator/attention/summary'),

  getComplaints: (params?: {
    page?: number;
    per_page?: number;
    status?: string;
    competition?: string;
  }) => {
    const queryString = params ? new URLSearchParams(Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== '') {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)).toString() : '';
    return apiClient.get<any>(`/internal/operator/complaints${queryString ? `?${queryString}` : ''}`);
  },

  getDrawAudits: (params?: {
    page?: number;
    per_page?: number;
    competition?: string;
    from_date?: string;
    to_date?: string;
  }) => {
    const queryString = params ? new URLSearchParams(Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== '') {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)).toString() : '';
    return apiClient.get<any>(`/internal/operator/draw-audits${queryString ? `?${queryString}` : ''}`);
  },

  getApiKeys: () => apiClient.get<any>('/internal/operator/api-keys'),

  createApiKey: (name: string) =>
    apiClient.post<any>('/internal/operator/api-keys', { name }),

  revokeApiKey: (keyId: number) =>
    apiClient.delete<any>(`/internal/operator/api-keys/${keyId}`),

  verifyChain: () =>
    apiClient.get<any>('/internal/operator/chain/verify'),

  verifyCompetitionChain: (uuid: string) =>
    apiClient.get<any>(`/internal/operator/competitions/${uuid}/chain/verify`),
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

  getDrawAudit: (uuid: string) =>
    fetch(`${API_BASE_URL}/api/public/draw-audits/${uuid}`).then((r) => r.json()),

  getStats: (uuid: string) =>
    fetch(`${API_BASE_URL}/api/v1/raffles/${uuid}/entries/stats`).then((r) =>
      r.json()
    ),

  getOdds: (uuid: string, entries: number) =>
    fetch(`${API_BASE_URL}/api/v1/raffles/${uuid}/odds?entries=${entries}`).then(
      (r) => r.json()
    ),

  getDrawAudits: (operatorUuid?: string, competitionUuid?: string, prizeId?: string, page?: number) => {
    const params = new URLSearchParams();
    if (operatorUuid) params.append('operator', operatorUuid);
    if (competitionUuid) params.append('competition', competitionUuid);
    if (prizeId) params.append('prize', prizeId);
    if (page) params.append('page', page.toString());
    const queryString = params.toString();
    return fetch(`${API_BASE_URL}/api/public/draw-audits${queryString ? `?${queryString}` : ''}`).then((r) => r.json());
  },

  downloadDrawAuditsJson: (operatorUuid?: string, competitionUuid?: string, prizeId?: string) => {
    const params = new URLSearchParams();
    if (operatorUuid) params.append('operator', operatorUuid);
    if (competitionUuid) params.append('competition', competitionUuid);
    if (prizeId) params.append('prize', prizeId);
    const queryString = params.toString();
    return fetch(`${API_BASE_URL}/api/public/draw-audits/download${queryString ? `?${queryString}` : ''}`).then((r) => r.json());
  },

  getDrawAuditOperators: () =>
    fetch(`${API_BASE_URL}/api/public/operators`).then((r) => r.json()),

  getPublicCompetitions: (operatorUuid?: string) => {
    const params = new URLSearchParams();
    if (operatorUuid) params.append('operator', operatorUuid);
    const queryString = params.toString();
    return fetch(`${API_BASE_URL}/api/public/competitions${queryString ? `?${queryString}` : ''}`).then((r) => r.json());
  },

  getPublicPrizes: (operatorUuid?: string, competitionUuid?: string) => {
    const params = new URLSearchParams();
    if (operatorUuid) params.append('operator', operatorUuid);
    if (competitionUuid) params.append('competition', competitionUuid);
    const queryString = params.toString();
    return fetch(`${API_BASE_URL}/api/public/prizes${queryString ? `?${queryString}` : ''}`).then((r) => r.json());
  },

  getOperators: () =>
    fetch(`${API_BASE_URL}/api/public/operators-list`).then((r) => r.json()),

  getCompetitionsByOperator: (operatorId: string) =>
    fetch(`${API_BASE_URL}/api/public/operators/${operatorId}/competitions`).then((r) => r.json()),

  verifyTicket: (competitionId: string, externalId: string) =>
    fetch(`${API_BASE_URL}/api/public/tickets/${competitionId}/${externalId}/verify`).then((r) => r.json()),

  verifyChain: () =>
    fetch(`${API_BASE_URL}/api/public/chain/verify`).then((r) => r.json()),

  getPublicCompetition: (competitionId: string) =>
    fetch(`${API_BASE_URL}/api/public/competitions/${competitionId}`).then((r) => r.json()),

  getPublicOperator: (slug: string) =>
    fetch(`${API_BASE_URL}/api/public/operators/${slug}/profile`).then((r) => r.json()),

  submitComplaint: (data: {
    competition_id: string;
    name: string;
    email: string;
    category: string;
    description: string;
  }) => {
    return apiClient.post<{ message: string; id: string }>('/api/public/complaints', data);
  },
};
