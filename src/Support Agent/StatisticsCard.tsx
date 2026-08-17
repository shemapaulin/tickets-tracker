import {
  ClipboardList,
  Inbox,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

import { Card } from "@/components/ui/card";

interface StatisticsCardsProps {
  totalComplaints: number;
  newComplaints: number;
  assignedComplaints: number;
  resolvedComplaints: number;
}

export default function StatisticsCards({
  totalComplaints,
  newComplaints,
  assignedComplaints,
  resolvedComplaints,
}: StatisticsCardsProps) {
  const statistics = [
    {
      label: "Total Complaints",
      value: totalComplaints,
      icon: ClipboardList,
      iconClass: "text-slate-600",
      bgClass: "bg-slate-100",
    },
    {
      label: "New",
      value: newComplaints,
      icon: Inbox,
      iconClass: "text-blue-600",
      bgClass: "bg-blue-50",
    },
    {
      label: "Assigned",
      value: assignedComplaints,
      icon: UserCheck,
      iconClass: "text-amber-600",
      bgClass: "bg-amber-50",
    },
    {
      label: "Resolved",
      value: resolvedComplaints,
      icon: CheckCircle2,
      iconClass: "text-green-600",
      bgClass: "bg-green-50",
    },
  ];

  return (
    <Card className="overflow-hidden border shadow-sm">
      <div className="grid grid-cols-2 divide-x divide-y sm:grid-cols-4 sm:divide-y-0">
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 px-4 py-4"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.bgClass}`}
              >
                <Icon
                  className={`h-5 w-5 ${stat.iconClass}`}
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-muted-foreground">
                  {stat.label}
                </p>

                <p className="text-xl font-bold tracking-tight">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}