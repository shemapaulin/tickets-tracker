import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Send,
  RotateCcw,
  UserRound,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type { Complaint } from "./AllComplaints";

interface Agent {
  id: number;
  name: string;
}

interface Props {
  complaint: Complaint | null;
  agents: Agent[];
  open: boolean;
  onOpenChange: (open: boolean) => void;

  onAssign: (
    id: number,
    agentName: string | null
  ) => void;

  onResolve: (id: number) => void;

  onReassign: (id: number) => void;

  onSubmit: (id: number) => void;

  onFeedbackChange: (
    id: number,
    feedback: string
  ) => void;
}

export default function TicketDetailsDialog({
  complaint,
  agents,
  open,
  onOpenChange,
  onAssign,
  onResolve,
  onReassign,
  onSubmit,
  onFeedbackChange,
}: Props) {
  const [feedback, setFeedback] =
    useState("");

  useEffect(() => {
    setFeedback(
      complaint?.feedback || ""
    );
  }, [complaint]);

  if (!complaint) return null;

  const resolved =
    complaint.status === "Resolved";

  const submitted =
    complaint.submittedToCustomer;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="overflow-hidden p-0 sm:max-w-[620px]">
        {/* Top status strip */}
        <div
          className={`h-1 ${
            complaint.status === "Under Review"
              ? "bg-blue-500"
              : complaint.status === "In Progress"
              ? "bg-amber-500"
              : "bg-green-500"
          }`}
        />

        <div className="p-6">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    CMP-
                    {String(
                      complaint.id
                    ).padStart(3, "0")}
                  </span>

                  <Badge
                    variant="outline"
                    className={
                      complaint.status ===
                      "Under Review"
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : complaint.status ===
                          "In Progress"
                        ? "border-amber-200 bg-amber-50 text-amber-700"
                        : "border-green-200 bg-green-50 text-green-700"
                    }
                  >
                    {complaint.status}
                  </Badge>
                </div>

                <DialogTitle className="text-lg">
                  {complaint.title}
                </DialogTitle>

                <DialogDescription>
                  Complete ticket information
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-6 space-y-5">
            {/* Customer */}
            <div className="rounded-xl border bg-muted/30 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background shadow-sm">
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    Customer
                  </p>

                  <p className="text-sm font-semibold">
                    {complaint.customerName}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Complaint
              </p>

              <div className="rounded-xl border bg-background p-3">
                <p className="text-sm leading-6">
                  {complaint.description}
                </p>
              </div>
            </div>

            {/* Agent */}
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Assigned Agent
              </p>

              <Select
                value={
                  complaint.supportAgent ?? ""
                }
                onValueChange={(value) =>
                  onAssign(
                    complaint.id,
                    value
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select support agent" />
                </SelectTrigger>

                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem
                      key={agent.id}
                      value={agent.name}
                    >
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Feedback */}
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Resolution / Customer Feedback
              </p>

              <Textarea
                value={feedback}
                onChange={(e) => {
                  setFeedback(
                    e.target.value
                  );

                  onFeedbackChange(
                    complaint.id,
                    e.target.value
                  );
                }}
                placeholder="Write the resolution or message that will be sent to the customer..."
                className="min-h-[90px] resize-none"
              />
            </div>

            {/* Customer submission state */}
            {resolved && submitted && (
              <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-green-800">
                    Submitted to customer
                  </p>

                  <p className="text-[11px] text-green-700">
                    The resolution has been sent successfully.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <DialogFooter className="mt-6 flex-col gap-2 border-t pt-4 sm:flex-row sm:justify-between">
            {/* Left */}
            <div>
              {resolved && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onReassign(
                      complaint.id
                    )
                  }
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reassign Ticket
                </Button>
              )}
            </div>

            {/* Right */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  onOpenChange(false)
                }
              >
                Close
              </Button>

              {!resolved && (
                <Button
                  onClick={() =>
                    onResolve(
                      complaint.id
                    )
                  }
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mark Resolved
                </Button>
              )}

              {resolved && !submitted && (
                <Button
                  onClick={() =>
                    onSubmit(
                      complaint.id
                    )
                  }
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit to Customer
                </Button>
              )}
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}