import { useMemo, useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";

import { complaints as initialComplaints } from "@/Services/complaints";
import { agents } from "@/Services/agents";

import StatisticsCards from "./StatisticsCard";
import TicketColumn from "./TicketColumn";
import TicketCard from "./TicketCard";
import TicketDetailsDialog from "./TicketsDetailsDialog";

import { Separator } from "@/components/ui/separator";

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
}

export default function Tickets() {
  const [complaints, setComplaints] = useState<Complaint[]>(
    initialComplaints as unknown as Complaint[]
  );

  const [selectedTicket, setSelectedTicket] =
    useState<Complaint | null>(null);

  const [activeTicket, setActiveTicket] =
    useState<Complaint | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const underReview = useMemo(
    () =>
      complaints.filter(
        (c) => c.status === "Under Review"
      ),
    [complaints]
  );

  const inProgress = useMemo(
    () =>
      complaints.filter(
        (c) => c.status === "In Progress"
      ),
    [complaints]
  );

  const resolved = useMemo(
    () =>
      complaints.filter(
        (c) => c.status === "Resolved"
      ),
    [complaints]
  );

  /*
   * Change ticket status when dragged
   */
  const handleDragStart = (event: any) => {
    const ticket = complaints.find(
      (c) => c.id === Number(event.active.id)
    );

    setActiveTicket(ticket || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTicket(null);

    const { active, over } = event;

    if (!over) return;

    const ticketId = Number(active.id);

    const newStatus = over.id as ComplaintStatus;

    if (
      ![
        "Under Review",
        "In Progress",
        "Resolved",
      ].includes(newStatus)
    ) {
      return;
    }

    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === ticketId
          ? {
              ...complaint,
              status: newStatus,
            }
          : complaint
      )
    );

    setSelectedTicket((current) =>
      current?.id === ticketId
        ? {
            ...current,
            status: newStatus,
          }
        : current
    );
  };

  /*
   * Assign ticket to agent
   */
  

  /*
   * Resolve ticket
   */
  const resolveTicket = (complaintId: number) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              status: "Resolved",
            }
          : complaint
      )
    );

    setSelectedTicket((current) =>
      current?.id === complaintId
        ? {
            ...current,
            status: "Resolved",
          }
        : current
    );
  };

  /*
   * Reassign resolved ticket
   */
  const reassignTicket = (complaintId: number) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              status: "In Progress",
              submittedToCustomer: false,
            }
          : complaint
      )
    );

    setSelectedTicket((current) =>
      current?.id === complaintId
        ? {
            ...current,
            status: "In Progress",
            submittedToCustomer: false,
          }
        : current
    );
  };

  /*
   * Submit resolution to customer
   */
  const submitToCustomer = (complaintId: number) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              submittedToCustomer: true,
            }
          : complaint
      )
    );

    setSelectedTicket((current) =>
      current?.id === complaintId
        ? {
            ...current,
            submittedToCustomer: true,
          }
        : current
    );
  };

  /*
   * Feedback
   */
  const updateFeedback = (
    complaintId: number,
    feedback: string
  ) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              feedback,
            }
          : complaint
      )
    );

    setSelectedTicket((current) =>
      current?.id === complaintId
        ? {
            ...current,
            feedback,
          }
        : current
    );
  };

  return (
    <div className="space-y-5">
      {/* Statistics */}
      <StatisticsCards
        totalComplaints={complaints.length}
        newComplaints={underReview.length}
        assignedComplaints={inProgress.length}
        resolvedComplaints={resolved.length}
      />

      <Separator />

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Tickets
        </h1>

        <p className="text-sm text-muted-foreground">
          Monitor every complaint from review to resolution.
        </p>
      </div>

      {/* Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <TicketColumn
            id="Under Review"
            title="Under Review"
            description="Tickets waiting for action"
            complaints={underReview}
            onTicketClick={setSelectedTicket}
          />

          <TicketColumn
            id="In Progress"
            title="In Progress"
            description="Currently being handled"
            complaints={inProgress}
            onTicketClick={setSelectedTicket}
          />

          <TicketColumn
            id="Resolved"
            title="Resolved"
            description="Completed tickets"
            complaints={resolved}
            onTicketClick={setSelectedTicket}
          />
        </div>

        <DragOverlay>
          {activeTicket ? (
            <TicketCard
              complaint={activeTicket}
              onClick={() => {}}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Details */}
      <TicketDetailsDialog
        complaint={selectedTicket}
        agents={agents}
        open={!!selectedTicket}
        onOpenChange={(open: any) => {
          if (!open) {
            setSelectedTicket(null);
          }
        } }
        onReassign={reassignTicket}
        onResolve={resolveTicket}
        onSubmit={submitToCustomer}
        onFeedbackChange={updateFeedback} onAssign={function (id: number, agentName: string | null): void {
          throw new Error("Function not implemented.");
          console.log(id, agentName);
        } }       />
    </div>
  );
}