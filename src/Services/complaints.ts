
export type ComplaintStatus =
  | "Under Review"
  | "In Progress"
  | "Resolved";

  export interface Complaint {
  id: number;
  customerId: number;
  customerName: string;
  title: string;
  description: string;

  status: ComplaintStatus;

  supportAgent?: string;

  feedback?: string;

  submittedToCustomer?: boolean;
  priority?: "Normal" | "High" | "Urgent";
}
export const complaints = [
  {
    id: 1,
    customerId: 1,
    title: "I can't get verification code",
    description: "after after a few attempts, I still can't get the verification code, I need help to get it",
    status: "Under Review",
    supportAgent: "Charles Murava",
    priority: "Urgent"
  
  },
  {
    id: 2,
    customerId: 2,
    title: "Complaint 2",
    description: "Description of complaint 2",  
    status: "Resolved",
    supportAgent: "Shingiro Audran",
    priority: "Urgent"
  }
]   