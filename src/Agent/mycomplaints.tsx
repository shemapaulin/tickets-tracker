import { useState } from "react";
import {
  complaints,
  updateComplaint,
} from "@/Services/complaints";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

interface Complaint {
  id: number;
  customerId: number;
  title: string;
  description: string;
  status: string;
  supportAgent: string;
}

interface MyComplaintsProps {
  complaints: Complaint[];
}

export default function MyComplaints({
  complaints,
}: MyComplaintsProps) {
  const [complaintList, setComplaintList] =
    useState<Complaint[]>(complaints);

  const [comments, setComments] = useState<
    Record<number, string>
  >({});

 const handleComplete = (complaintId: number) => {
  const complaint = complaintList.find(
    (c) => c.id === complaintId
  );

  if (!complaint) return;

  updateComplaint(
    complaintId,
    complaint.status
  );

  setComplaintList([...complaints]);

  alert("Complaint updated successfully!");
};

  return (
    <div>

      <h2 className="text-3xl font-bold mb-6">
        My Complaints
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {complaintList.map((complaint) => (

          <Card key={complaint.id}>

            <CardHeader>

              <CardTitle>
                #{complaint.id} - {complaint.title}
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              <p>
                <strong>Customer:</strong>{" "}
                {complaint.customerId}
              </p>

              <p>{complaint.description}</p>

              <div className="flex items-center gap-3">

                <Select
                  value={complaint.status}
                  onValueChange={(newStatus) => {
                    if (newStatus === null) return;

                    const updated =
                      complaintList.map((c) =>
                        c.id === complaint.id
                          ? {
                              ...c,
                              status: newStatus,
                            }
                          : c
                      );

                    setComplaintList(updated);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Under Review">
                      Under Review
                    </SelectItem>

                    <SelectItem value="In Progress">
                      In Progress
                    </SelectItem>

                    <SelectItem value="Resolved">
                      Resolved
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Badge
                  className={
                    complaint.status === "Resolved"
                      ? "bg-green-600"
                      : complaint.status ===
                        "In Progress"
                      ? "bg-yellow-500"
                      : "bg-blue-600"
                  }
                >
                  {complaint.status}
                </Badge>

              </div>

              <FieldSet>

                <FieldGroup>

                  <Field>

                    <FieldLabel>
                      Comments
                    </FieldLabel>

                    <Textarea
                      placeholder="Add your comments..."
                      className="resize-none"
                      value={
                        comments[complaint.id] || ""
                      }
                      onChange={(e) =>
                        setComments((prev) => ({
                          ...prev,
                          [complaint.id]:
                            e.target.value,
                        }))
                      }
                    />

                  </Field>

                </FieldGroup>

              </FieldSet>

            </CardContent>

            <div className="flex justify-end p-4">

              <Button
  className="bg-green-600 hover:bg-green-700"
  onClick={() => handleComplete(complaint.id)}
>
  Complete
</Button>

            </div>

          </Card>

        ))}

      </div>

    </div>
  );
}