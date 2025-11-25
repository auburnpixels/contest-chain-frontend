import { 
  Clock, 
  Search, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  FileWarning
} from 'lucide-react';
import { IndicatorBadge } from '@/components/ui/indicator-badge';

/**
 * Complaint interface matching the API response
 */
export interface Complaint {
  id: string;
  competition?: string;
  competition_id?: string;
  reporter_name?: string;
  reporter_email?: string;
  category?: string;
  message?: string;
  status: string;
  created_at: string;
  admin_notes?: string;
}

/**
 * Status configuration map for IndicatorBadge components.
 * Maps complaint status strings to their icon, color, and display text.
 */
export const COMPLAINT_STATUS_CONFIG: Record<
  string, 
  { 
    icon: any; 
    color: "green" | "yellow" | "blue" | "red" | "white" | "gray" | "purple" | "orange"; 
    text: string;
  }
> = {
  pending: { icon: Clock, color: "yellow", text: "Pending" },
  investigating: { icon: Search, color: "blue", text: "Investigating" },
  resolved: { icon: CheckCircle, color: "green", text: "Resolved" },
  dismissed: { icon: XCircle, color: "red", text: "Dismissed" },
  escalated: { icon: AlertTriangle, color: "orange", text: "Escalated" },
  on_hold: { icon: FileWarning, color: "gray", text: "On Hold" },
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
      icon={config.icon} 
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



