import { agents } from "@/Services/agents";
import { complaints } from "@/Services/complaints";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Progress } from "@/components/ui/progress";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  Users,
} from "lucide-react";

export default function DashboardHome() {
  const totalComplaints = complaints.length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const inProgress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const pending = complaints.filter(
    (c) =>
      c.status === "Submitted" ||
      c.status === "Under Review"
  ).length;

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}

      <div>

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Welcome back Administrator
        </p>

      </div>

      {/* ================= STATISTICS ================= */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card>

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
              className="text-primary"
              size={40}
            />

          </CardContent>

        </Card>

        <Card>

          <CardContent className="flex items-center justify-between p-6">

            <div>

              <p className="text-sm text-muted-foreground">
                Pending
              </p>

              <h2 className="text-4xl font-bold">
                {pending}
              </h2>

            </div>

            <Clock3
              className="text-yellow-500"
              size={40}
            />

          </CardContent>

        </Card>

        <Card>

          <CardContent className="flex items-center justify-between p-6">

            <div>

              <p className="text-sm text-muted-foreground">
                Resolved
              </p>

              <h2 className="text-4xl font-bold">
                {resolved}
              </h2>

            </div>

            <CheckCircle2
              className="text-green-600"
              size={40}
            />

          </CardContent>

        </Card>

        <Card>

          <CardContent className="flex items-center justify-between p-6">

            <div>

              <p className="text-sm text-muted-foreground">
                Active Agents
              </p>

              <h2 className="text-4xl font-bold">
                {agents.length}
              </h2>

            </div>

            <Users
              className="text-blue-600"
              size={40}
            />

          </CardContent>

        </Card>

      </div>

      {/* ================= MIDDLE ================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Statistics */}

        <Card>

          <CardHeader>

            <CardTitle>
              Complaint Statistics
            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-6">

            <div>

              <div className="flex justify-between">

                <span>Resolved</span>

                <span>{resolved}</span>

              </div>

              <Progress
                value={
                  (resolved / totalComplaints) * 100
                }
              />

            </div>

            <div>

              <div className="flex justify-between">

                <span>In Progress</span>

                <span>{inProgress}</span>

              </div>

              <Progress
                value={
                  (inProgress / totalComplaints) *
                  100
                }
              />

            </div>

            <div>

              <div className="flex justify-between">

                <span>Pending</span>

                <span>{pending}</span>

              </div>

              <Progress
                value={
                  (pending / totalComplaints) * 100
                }
              />

            </div>

          </CardContent>

        </Card>

        {/* Agent workload */}

        <Card>

          <CardHeader>

            <CardTitle>
              Agent Workload
            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-5">

            {agents.map((agent) => {

              const count = complaints.filter(
                (c) =>
                  c.supportAgent === agent.name
              ).length;

              return (

                <div key={agent.id}>

                  <div className="flex justify-between mb-2">

                    <span>{agent.name}</span>

                    <Badge>
                      {count} Tickets
                    </Badge>

                  </div>

                  <Progress
                    value={(count / totalComplaints) * 100}
                  />

                </div>

              );

            })}

          </CardContent>

        </Card>

      </div>

      {/* ================= TABLE ================= */}

      <Card>

        <CardHeader>

          <CardTitle>
            Recent Complaints
          </CardTitle>

        </CardHeader>

        <CardContent>

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>ID</TableHead>

                <TableHead>Title</TableHead>

                <TableHead>Customer</TableHead>

                <TableHead>Status</TableHead>

                <TableHead>Agent</TableHead>

                <TableHead>Actions</TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {complaints.map((complaint) => (

                <TableRow key={complaint.id}>

                  <TableCell>
                    #{complaint.id}
                  </TableCell>

                  <TableCell>
                    {complaint.title}
                  </TableCell>

                  <TableCell>
                    {complaint.customerId}
                  </TableCell>

                  <TableCell>

                    <Badge
                      variant={
                        complaint.status ===
                        "Resolved"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {complaint.status}
                    </Badge>

                  </TableCell>

                  <TableCell>
                    {complaint.supportAgent}
                  </TableCell>

                  <TableCell>

                    <div className="flex gap-2">

                      <Button
                        size="sm"
                        variant="outline"
                      >
                        Assign
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                      >
                        Reassign
                      </Button>

                      <Button size="sm">
                        View
                      </Button>

                    </div>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </CardContent>

      </Card>

    </div>
  );
}