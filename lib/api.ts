export interface Operator {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'suspended';
  created_at: string;
}

export interface Competition {
  id: number;
  external_id: string;
  uuid: string;
  title: string;
  description?: string;
  ticket_quantity: number;
  ticket_price: number;
  draw_at: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface CompetitionStatistics {
  total_entries: number;
  unique_participants: number;
  revenue_estimate: number;
  tickets_sold_percentage: number;
}

export interface DrawAudit {
  id: number;
  competition_id: number;
  draw_block_hash: string;
  previous_block_hash: string;
  seed_value: string;
  winner_ticket_number: string;
  drawn_at_utc: string;
  verified: boolean;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export class CaasClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      throw new Error(errorData.error?.message || `API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Competitions
  async createCompetition(data: Partial<Competition>): Promise<Competition> {
    return this.request<Competition>('/operator/competitions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCompetition(externalId: string): Promise<Competition & { statistics: CompetitionStatistics }> {
    return this.request<Competition & { statistics: CompetitionStatistics }>(`/operator/competitions/${externalId}`);
  }

  async getCompetitionAudits(externalId: string): Promise<{ audits: DrawAudit[] }> {
    return this.request<{ audits: DrawAudit[] }>(`/operator/competitions/${externalId}/audits`);
  }

  // Draws
  async runDraw(externalId: string): Promise<any> {
    return this.request(`/operator/competitions/${externalId}/draws/run`, {
      method: 'POST',
    });
  }

  // Compliance
  async getComplianceSummary(): Promise<any> {
    return this.request('/operator/compliance');
  }
}

// Export a singleton or factory if needed, currently exporting class for instantiation
export default CaasClient;






