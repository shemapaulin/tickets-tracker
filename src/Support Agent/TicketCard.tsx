import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  UserRound,
} from "lucide-react";

import type { Complaint } from "./AllComplaints";

interface Props {
  complaint: Complaint;
  onClick: () => void;
}

export default function TicketCard({
  complaint,
  onClick,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: complaint.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const colors = {
    "Under Review":
      "border-l-blue-500 hover:border-blue-300",

    "In Progress":
      "border-l-amber-500 hover:border-amber-300",

    Resolved:
      "border-l-green-500 hover:border-green-300",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`group rounded-lg border border-l-[3px] bg-background p-2.5 shadow-sm transition-all ${
        colors[complaint.status]
      } ${
        isDragging
          ? "opacity-30"
          : "hover:-translate-y-[1px] hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-2">
        {/* Drag */}
        <button
          type="button"
          {...listeners}
          className="cursor-grab touch-none text-muted-foreground/30 hover:text-muted-foreground active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {/* Content */}
        <button
          type="button"
          onClick={onClick}
          className="min-w-0 flex-1 text-left"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              CMP-{String(complaint.id).padStart(3, "0")}
            </span>
          </div>

          <p className="mt-0.5 truncate text-xs font-semibold">
            {complaint.title}
          </p>

          <div className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">
            <UserRound className="h-3 w-3" />

            <span className="truncate">
              {complaint.supportAgent ||
                "Unassigned"}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}