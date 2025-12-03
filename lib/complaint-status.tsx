import { IndicatorBadge } from '@/components/ui/indicator-badge';

/**
 * Complaint interface matching the API response
 */
export interface Complaint {
  id: string;
  competition?: string;
  competition_id?: string;
  name?: string;
  email?: string;
  category?: string;
  message?: string;
  status: string;
  created_at: string;
  admin_notes?: string;
}

/**
 * Status configuration map for IndicatorBadge components.
 * Maps complaint status strings to their color and display text.
 */
export const COMPLAINT_STATUS_CONFIG: Record<
  string, 
  { 
    color: "green" | "yellow" | "blue" | "red" | "white" | "gray" | "purple" | "orange"; 
    text: string;
  }
> = {
  pending: { color: "yellow", text: "Pending" },
  investigating: { color: "blue", text: "Investigating" },
  resolved: { color: "green", text: "Resolved" },
  dismissed: { color: "red", text: "Dismissed" },
  escalated: { color: "orange", text: "Escalated" },
  on_hold: { color: "gray", text: "On Hold" },
};

/**
 * Returns an IndicatorBadge component for a complaint's status.
 * Automatically applies appropriate styling based on status.
 */
export const getComplaintStatusBadge = (complaint: Complaint) => {
  const status = complaint.status;
  
  const config = COMPLAINT_STATUS_CONFIG[status] || COMPLAINT_STATUS_CONFIG.pending;
  
  return (
    <IndicatorBadge 
      color={config.color} 
      text={config.text} 
    />
  );
};

/**
 * Helper to get the count of complaints by status
 */
export const getComplaintCountByStatus = (complaints: Complaint[], status: string): number => {
  return complaints.filter(c => c.status === status).length;
};

/**
 * Helper to format complaint category for display
 */
export const formatComplaintCategory = (category: string): string => {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};



