import { useDroppable } from "@dnd-kit/core";
import {
  ClipboardCheck,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

import TicketCard from "./TicketCard";

import type {
  Complaint,
  ComplaintStatus,
} from "./AllComplaints";

interface Props {
  id: ComplaintStatus;
  title: string;
  description: string;
  complaints: Complaint[];
  onTicketClick: (complaint: Complaint) => void;
}

export default function TicketColumn({
  id,
  title,
  description,
  complaints,
  onTicketClick,
}: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const config = {
    "Under Review": {
      icon: ClipboardCheck,
      header:
        "border-blue-200 bg-blue-50/70",
      iconBg:
        "bg-blue-100 text-blue-600",
      count:
        "bg-blue-100 text-blue-700",
      dot:
        "bg-blue-500",
    },

    "In Progress": {
      icon: LoaderCircle,
      header:
        "border-amber-200 bg-amber-50/70",
      iconBg:
        "bg-amber-100 text-amber-600",
      count:
        "bg-amber-100 text-amber-700",
      dot:
        "bg-amber-500",
    },

    Resolved: {
      icon: CheckCircle2,
      header:
        "border-green-200 bg-green-50/70",
      iconBg:
        "bg-green-100 text-green-600",
      count:
        "bg-green-100 text-green-700",
      dot:
        "bg-green-500",
    },
  };

  const style = config[id];

  const Icon = style.icon;

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-[560px] flex-col overflow-hidden rounded-xl border bg-muted/20 transition-all ${
        isOver
          ? "scale-[1.01] border-primary/40 shadow-md"
          : ""
      }`}
    >
      {/* Header */}
      <div
        className={`border-b px-4 py-3 ${style.header}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${style.icon}`}
            >
              <Icon className="h-4 w-4" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                />

                <h2 className="text-sm font-semibold">
                  {title}
                </h2>
              </div>

              <p className="text-[11px] text-muted-foreground">
                {description}
              </p>
            </div>
          </div>

          <span
            className={`rounded-full px-2 py-0.5 text-xs font-bold ${style.count}`}
          >
            {complaints.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        {complaints.map((complaint) => (
          <TicketCard
            key={complaint.id}
            complaint={complaint}
            onClick={() =>
              onTicketClick(complaint)
            }
          />
        ))}

        {complaints.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <Icon className="mx-auto mb-2 h-7 w-7 text-muted-foreground/30" />

              <p className="text-xs font-medium text-muted-foreground">
                No tickets
              </p>

              <p className="mt-1 text-[10px] text-muted-foreground/60">
                Drag tickets here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}