import { useState } from "react";

import { complaints as initialComplaints } from "@/Services/complaints";
import { agents } from "@/Services/agents";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";

import {
  ClipboardList,
  Clock3,
  CheckCircle2,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface Complaint {
  id: number;
  customerId: number;
  customerName?: string;
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

  const total = complaints.length;

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



          <div className="grid md:grid-cols-3 gap-6">

              <Card>

                  <CardContent className="flex justify-between items-center p-6">

                      <div>

                          <p className="text-muted-foreground">
                              Total Complaints
                          </p>

                          <h1 className="text-4xl font-bold">
                              {total}
                          </h1>

                      </div>

                      <ClipboardList
                          className="text-primary"
                          size={42} />

                  </CardContent>

              </Card>

              <Card>

                  <CardContent className="flex justify-between items-center p-6">

                      <div>

                          <p className="text-muted-foreground">
                              New
                          </p>

                          <h1 className="text-4xl font-bold">
                              {newComplaints.length}
                          </h1>

                      </div>

                      <Clock3
                          className="text-yellow-500"
                          size={42} />

                  </CardContent>

              </Card>

              <Card>

                  <CardContent className="flex justify-between items-center p-6">

                      <div>

                          <p className="text-muted-foreground">
                              Resolved
                          </p>

                          <h1 className="text-4xl font-bold">
                              {resolved.length}
                          </h1>

                      </div>

                      <CheckCircle2
                          className="text-green-600"
                          size={42} />

                  </CardContent>

              </Card>

          </div>

          <Separator />


          <div>

              <h2 className="text-3xl font-bold mb-6">

                  🆕 New Complaints

              </h2>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                  {newComplaints.map((complaint) => (

                      <Card
                          key={complaint.id}
                          className="border-l-4 border-red-500"
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

                                  <p>
                                      {complaint.customerName}
                                  </p>

                              </div>

                              <div>

                                  <p className="font-semibold">
                                      Description
                                  </p>

                                  <p className="text-muted-foreground">

                                      {complaint.description}

                                  </p>

                              </div>

                              <Badge>

                                  New Complaint

                              </Badge>

                              <Select
                                  onValueChange={(value) => assignComplaint(
                                      complaint.id,
                                      value as string
                                  )}
                              >

                                  <SelectTrigger>

                                      <SelectValue
                                          placeholder="Assign Agent" />

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

                          </CardContent>

                      </Card>

                  ))}

              </div>

          </div>

      </div>

      <Separator />

      <div>

          <h3 className="text-3xl font-bold mb-6">

              🟨 Assigned Complaints

          </h3>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {assigned.map((complaint) => (

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

                              <p>

                                  {complaint.customerName}

                              </p>

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
                              onChange={(e) => updateFeedback(
                                  complaint.id,
                                  e.target.value
                              )} />

                          <Button
                              className="w-full bg-green-600 hover:bg-green-700"
                              onClick={() => resolveComplaint(
                                  complaint.id
                              )}
                          >

                              Mark as Resolved

                          </Button>

                      </CardContent>

                  </Card>

              ))}

          </div>

      </div>
      
      
      
       <Separator />

        <h2 className="text-3xl font-bold mb-6">

          🟩 Resolved Complaints

        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {resolved.map((complaint) => (

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

                  <p>

                    {complaint.customerName}

                  </p>

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

                    {complaint.feedback || "No feedback provided."}

                  </p>

                </div>

                <div className="flex gap-3">

                  <Button
                    className="flex-1"
                    onClick={() => {
                      console.log(
                        "Feedback submitted:",
                        {
                          complaintId: complaint.id,
                          customer: complaint.customerName,
                          feedback: complaint.feedback,
                        }
                      );

                      alert(
                        "Feedback submitted successfully!"
                      );
                    }}
                  >
                    Submit Feedback
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setComplaints((prev) =>
                        prev.map((c) =>
                          c.id === complaint.id
                            ? {
                                ...c,
                                status: "New",
                                supportAgent: "",
                                feedback: "",
                              }
                            : c
                        )
                      );
                    }}
                  >
                    Reassign
                  </Button>

                </div>

              </CardContent>

            </Card>

          ))}

        </div>

    </>
  );
}