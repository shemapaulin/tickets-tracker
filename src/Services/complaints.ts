export interface Complaint {
  id: number;
  customerId: number;
  title: string;
  description: string;
  status: string;
  supportAgent: string;
}
export const complaints: Complaint[] = [
  {
    id: 1,
    customerId: 1,
    title: "I can't get verification code",
    description: "after after a few attempts, I still can't get the verification code, I need help to get it",
    status: "",
    supportAgent: "Shingiro Audran",
  },
  {
    id: 2,
    customerId: 2,
    title: "Complaint 2",
    description: "Description of complaint 2",  
    status: "",
    supportAgent: "Shingiro Audran",
  }
]   

export const updateComplaint = (
  id: number,
  status: string
) => {
  const complaint = complaints.find(
    (complaint) => complaint.id === id
  );

  if (!complaint) return;

  complaint.status = status;
};