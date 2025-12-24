export interface Operator {
  id: number;
  name: string;
  slug: string;
  url: string | null;
  is_active: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Prize {
  id: string;
  external_id: string;
  name: string;
  draw_order: number;
  has_been_drawn: boolean;
  winning_ticket: {
    id: string;
    external_id: string;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface Competition {
  id: string;
  external_id: string;
  name: string;
  status: string;
  draw_at: string | null;
  created_at: string;
  updated_at: string;
  entries_count: number;
  free_entries_count: number;
  prizes_count: number;
  complaints_count: number;
  draw_audits_count: number;
  draw_events_count: number;
  compliance_status: string;
  compliance_percentage: number;
  compliance_checks: Record<string, any>;
  compliance_score: number | null; // Simple numeric score from ComplianceScoreCalculator
  compliance_score_detail?: ComplianceScore | null; // Detailed breakdown (optional)
  is_draw_overdue: boolean;
  prizes?: Prize[];
}

export interface DrawAudit {
  id: string;
  sequence: number;
  draw_id: string;
  drawn_at_utc: string;
  total_entries: number;
  selected_entry: {
    id: string;
    external_id: string;
  } | null;
  signature_hash: string;
  previous_signature_hash: string | null;
  pool_hash: string | null;
  rng_seed_or_hash: string;
  created_at: string;
  competition?: {
    id: string;
    name: string;
    external_id: string;
  };
  prize?: {
    id: string;
    name: string;
  };
}

export interface DrawEvent {
  id: string;
  sequence: number;
  event_type: string;
  event_payload: any;
  event_hash: string;
  previous_event_hash: string | null;
  is_chained: boolean;
  actor_type: string;
  actor_id: string | null;
  ip_address: string | null;
  created_at: string;
  competition?: {
    id: string;
    name: string;
    external_id: string;
  };
}

export interface Complaint {
  id: string;
  competition_id: string;
  external_id?: string;
  competition?: string;
  user_reference?: string;
  category: string;
  status: string;
  created_at: string;
  updated_at: string;
  message?: string;
  admin_notes?: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface CompetitionStatistics {
  total_entries: number;
  total_draws: number;
  total_prizes: number;
  completion_rate: number;
}

export interface ComplianceCategory {
  score: number;
  max: number;
  details: Record<string, any>;
}

export interface ComplianceScore {
  total_score: number;
  grade: 'excellent' | 'acceptable' | 'poor';
  grade_label: string;
  grade_color: string;
  is_final: boolean;
  categories: {
    entry_integrity: ComplianceCategory;
    draw_integrity: ComplianceCategory;
    draw_logging: ComplianceCategory;
    fairness: ComplianceCategory;
    complaint: ComplianceCategory;
    transparency: ComplianceCategory;
    timeliness: ComplianceCategory;
  };
  calculated_at: string;
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






