import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Complaint {
  id: number;
  customerId: number;
  customerName: string;
  title: string;
  description: string;
  status: "New" | "Assigned" | "Resolved";
  supportAgent?: string;
  feedback?: string;
}

interface ResolvedComplaintsProps {
  complaints: Complaint[];

  onSubmitFeedback: (complaint: Complaint) => void;

  onReassign: (complaintId: number) => void;
}

export default function ResolvedComplaints({
  complaints,
  onSubmitFeedback,
  onReassign,
}: ResolvedComplaintsProps) {
  return (
    <div>

      <h2 className="text-3xl font-bold mb-6">
        🟩 Resolved Complaints
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {complaints.map((complaint) => (

          <Card
            key={complaint.id}
            className="border-l-4 border-green-600 shadow-lg shadow-green-200"
          >

            <CardHeader>

              <CardTitle>
                {complaint.title}
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              <div>

                <p className="font-semibold">
                  Customer
                </p>

                <p>{complaint.customerName}</p>

              </div>

              <div>

                <p className="font-semibold">
                  Assigned Agent
                </p>

                <Badge variant="secondary">
                  {complaint.supportAgent}
                </Badge>

              </div>

              <div>

                <p className="font-semibold">
                  Description
                </p>

                <p className="text-muted-foreground">
                  {complaint.description}
                </p>

              </div>

              <div>

                <p className="font-semibold">
                  Resolution Feedback
                </p>

                <p className="text-sm text-muted-foreground">
                  {complaint.feedback || "No feedback"}
                </p>

              </div>

              <div className="flex gap-3">

                <Button
                  className="flex-1"
                  onClick={() =>
                    onSubmitFeedback(complaint)
                  }
                >
                  Submit Feedback
                </Button>

                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    onReassign(complaint.id)
                  }
                >
                  Reassign
                </Button>

              </div>

            </CardContent>

          </Card>

        ))}

      </div>

    </div>
  );
}