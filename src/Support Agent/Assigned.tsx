import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

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

interface AssignedComplaintsProps {
  complaints: Complaint[];

  onFeedbackChange: (
    complaintId: number,
    feedback: string
  ) => void;

  onResolve: (
    complaintId: number
  ) => void;
}

export default function AssignedComplaints({
  complaints,
  onFeedbackChange,
  onResolve,
}: AssignedComplaintsProps) {
  return (
    <div>

      <h2 className="text-3xl font-bold mb-6">
        🟨 Assigned Complaints
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {complaints.map((complaint) => (

          <Card
            key={complaint.id}
            className="border-l-4 border-yellow-500 shadow-lg shadow-yellow-200"
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

                <Badge>
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

              <Textarea
                placeholder="Write resolution feedback..."
                value={complaint.feedback ?? ""}
                onChange={(e) =>
                  onFeedbackChange(
                    complaint.id,
                    e.target.value
                  )
                }
              />

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() =>
                  onResolve(complaint.id)
                }
              >
                Mark as Resolved
              </Button>

            </CardContent>

          </Card>

        ))}

      </div>

    </div>
  );
}