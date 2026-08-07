import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  Users,
} from "lucide-react";

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
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {/* Total Complaints */}

      <Card className="hover:shadow-lg transition-shadow">

        <CardContent className="flex items-center justify-between p-6">

          <div>

            <p className="text-sm text-muted-foreground">
              Total Complaints
            </p>

            <h2 className="text-4xl font-bold">
              {totalComplaints}
            </h2>

          </div>

          <ClipboardList
            size={42}
            className="text-primary"
          />

        </CardContent>

      </Card>

      {/* New */}

      <Card className="hover:shadow-lg transition-shadow">

        <CardContent className="flex items-center justify-between p-6">

          <div>

            <p className="text-sm text-muted-foreground">
              New Complaints
            </p>

            <h2 className="text-4xl font-bold text-red-500">
              {newComplaints}
            </h2>

          </div>

          <Clock3
            size={42}
            className="text-red-500"
          />

        </CardContent>

      </Card>

      {/* Assigned */}

      <Card className="hover:shadow-lg transition-shadow">

        <CardContent className="flex items-center justify-between p-6">

          <div>

            <p className="text-sm text-muted-foreground">
              Assigned
            </p>

            <h2 className="text-4xl font-bold text-yellow-500">
              {assignedComplaints}
            </h2>

          </div>

          <Users
            size={42}
            className="text-yellow-500"
          />

        </CardContent>

      </Card>

      {/* Resolved */}

      <Card className="hover:shadow-lg transition-shadow">

        <CardContent className="flex items-center justify-between p-6">

          <div>

            <p className="text-sm text-muted-foreground">
              Resolved
            </p>

            <h2 className="text-4xl font-bold text-green-600">
              {resolvedComplaints}
            </h2>

          </div>

          <CheckCircle2
            size={42}
            className="text-green-600"
          />

        </CardContent>

      </Card>

    </div>
  );
}