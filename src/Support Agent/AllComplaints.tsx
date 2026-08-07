import { useState } from "react";

import { complaints as initialComplaints } from "@/Services/complaints";
import { agents } from "@/Services/agents";
import ResolvedComplaints from "./Resolved";
import AssignedComplaints from "./Assigned";
import NewComplaints from "./NewComplaints";

import { Separator } from "@/components/ui/separator";
import StatisticsCards from "./StatisticsCard";


interface Complaint {
  id: number;
  customerId: number;
  customerName: string;
  title: string;
  description: string;

  status:
    | "New"
    | "Assigned"
    | "Resolved";

  supportAgent?: string;

  feedback?: string;
}

export default function AllComplaints() {
  const handleSubmitFeedback = (complaint: Complaint) => {
  console.log({
    complaintId: complaint.id,
    customer: complaint.customerName,
    feedback: complaint.feedback,
  });

  alert("Feedback submitted successfully!");
};

const handleReassign = (complaintId: number) => {
  setComplaints((prev) =>
    prev.map((c) =>
      c.id === complaintId
        ? {
            ...c,
            status: "New",
            supportAgent: "",
            feedback: "",
          }
        : c
    )
  );
};
  const [complaints, setComplaints] =
    useState<Complaint[]>(initialComplaints as Complaint[]);

  const assignComplaint = (
    complaintId: number,
    agentName: string
  ) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaintId
          ? {
              ...c,
              status: "Assigned",
              supportAgent: agentName,
            }
          : c
      )
    );
  };

  const newComplaints = complaints.filter(
    (c) => c.status === "New"
  );

  const assigned = complaints.filter(
    (c) => c.status === "Assigned"
  );

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  );

   const updateFeedback = (
    complaintId: number,
    feedback: string
  ) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaintId
          ? {
              ...c,
              feedback,
            }
          : c
      )
    );
  };

  const resolveComplaint = (
    complaintId: number
  ) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaintId
          ? {
              ...c,
              status: "Resolved",
            }
          : c
      )
    );
  };

  return (
    <><div className="space-y-8">



          <StatisticsCards
  totalComplaints={complaints.length}
  newComplaints={newComplaints.length}
  assignedComplaints={assigned.length}
  resolvedComplaints={resolved.length}
/>

          <Separator />


          <NewComplaints
  complaints={newComplaints}
  agents={agents}
  onAssign={assignComplaint}
/>

      </div>

      <Separator />

     <AssignedComplaints
  complaints={assigned}
  onFeedbackChange={updateFeedback}
  onResolve={resolveComplaint}
/>
      
      
      
       <Separator />

        <ResolvedComplaints
      complaints={resolved}
      onSubmitFeedback={handleSubmitFeedback}
      onReassign={handleReassign}
    />

    </>
  );
}