import { useState } from "react";

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
  UserRound,
  Eye,
  UserPlus,
  X,
} from "lucide-react";


/* =========================================================
   TYPES
========================================================= */

type Complaint = (typeof complaints)[number];


/* =========================================================
   COMPONENT
========================================================= */

export default function DashboardHome() {

  /* =======================================================
     STATE
  ======================================================= */

  const [complaintList, setComplaintList] =
    useState(complaints);

  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);

  const [assigningComplaint, setAssigningComplaint] =
    useState<number | null>(null);


  /* =======================================================
     STATISTICS
  ======================================================= */

  const totalComplaints =
    complaintList.length;

  const resolved =
    complaintList.filter(
      (c) => c.status === "Resolved"
    ).length;

  const inProgress =
    complaintList.filter(
      (c) => c.status === "In Progress"
    ).length;

  const pending =
    complaintList.filter(
      (c) =>
        c.status === "Submitted" ||
        c.status === "Under Review"
    ).length;


  /* =======================================================
     ASSIGN COMPLAINT
  ======================================================= */

  const handleAssign = (
    complaintId: number,
    agentName: string
  ) => {

    setComplaintList(
      (previous) =>
        previous.map((complaint) => {

          if (
            complaint.id === complaintId
          ) {

            return {
              ...complaint,
              supportAgent: agentName,
            };

          }

          return complaint;

        })
    );

    setAssigningComplaint(null);
  };


  /* =======================================================
     PROGRESS VALUE
  ======================================================= */

  const percentage = (
    value: number
  ) => {

    if (totalComplaints === 0) {
      return 0;
    }

    return (
      (value / totalComplaints) *
      100
    );
  };


  /* =======================================================
     STATUS STYLE
  ======================================================= */

  const getStatusStyle = (
    status: string
  ) => {

    switch (status) {

      case "Resolved":
        return "bg-green-50 text-green-700 border-green-200";

      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Under Review":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";

      case "Submitted":
        return "bg-slate-50 text-slate-700 border-slate-200";

      default:
        return "bg-slate-50 text-slate-700";

    }
  };


  function updatePriority(id: number, arg1: string): void {
    throw new Error("Function not implemented.");
  }

  /* =======================================================
     RETURN
  ======================================================= */

  return (

    <div className="space-y-6">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back, Administrator
          </p>

        </div>

        <div className="hidden rounded-lg border bg-white px-3 py-2 text-xs text-muted-foreground shadow-sm sm:block">
          Complaint Management
        </div>

      </div>


      {/* ===================================================
          STATISTICS
      =================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL */}

        <Card className="border-0 shadow-sm">

          <CardContent className="flex items-center justify-between p-4">

            <div>

              <p className="text-xs font-medium text-muted-foreground">
                Total Complaints
              </p>

              <p className="mt-1 text-2xl font-bold">
                {totalComplaints}
              </p>

              <p className="mt-1 text-[11px] text-muted-foreground">
                All submitted complaints
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">

              <ClipboardList className="h-5 w-5 text-primary" />

            </div>

          </CardContent>

        </Card>


        {/* PENDING */}

        <Card className="border-0 shadow-sm">

          <CardContent className="flex items-center justify-between p-4">

            <div>

              <p className="text-xs font-medium text-muted-foreground">
                Pending
              </p>

              <p className="mt-1 text-2xl font-bold">
                {pending}
              </p>

              <p className="mt-1 text-[11px] text-muted-foreground">
                Awaiting action
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50">

              <Clock3 className="h-5 w-5 text-yellow-600" />

            </div>

          </CardContent>

        </Card>


        {/* RESOLVED */}

        <Card className="border-0 shadow-sm">

          <CardContent className="flex items-center justify-between p-4">

            <div>

              <p className="text-xs font-medium text-muted-foreground">
                Resolved
              </p>

              <p className="mt-1 text-2xl font-bold">
                {resolved}
              </p>

              <p className="mt-1 text-[11px] text-muted-foreground">
                Successfully completed
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">

              <CheckCircle2 className="h-5 w-5 text-green-600" />

            </div>

          </CardContent>

        </Card>


        {/* AGENTS */}

        <Card className="border-0 shadow-sm">

          <CardContent className="flex items-center justify-between p-4">

            <div>

              <p className="text-xs font-medium text-muted-foreground">
                Active Agents
              </p>

              <p className="mt-1 text-2xl font-bold">
                {agents.length}
              </p>

              <p className="mt-1 text-[11px] text-muted-foreground">
                Support team
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">

              <Users className="h-5 w-5 text-blue-600" />

            </div>

          </CardContent>

        </Card>

      </div>


      {/* ===================================================
          MIDDLE SECTION
      =================================================== */}

      <div className="grid gap-4 lg:grid-cols-2">


        {/* =================================================
            COMPLAINT STATISTICS
        ================================================= */}

        <Card className="border-0 shadow-sm">

          <CardHeader className="pb-3">

            <CardTitle className="text-base">
              Complaint Statistics
            </CardTitle>

            <p className="text-xs text-muted-foreground">
              Current distribution of complaints
            </p>

          </CardHeader>

          <CardContent className="space-y-4">


            {/* RESOLVED */}

            <div>

              <div className="mb-1.5 flex items-center justify-between">

                <span className="text-xs font-medium">
                  Resolved
                </span>

                <span className="text-xs font-semibold">
                  {resolved}
                </span>

              </div>

              <Progress
                value={percentage(resolved)}
                className="h-1.5"
              />

            </div>


            {/* IN PROGRESS */}

            <div>

              <div className="mb-1.5 flex items-center justify-between">

                <span className="text-xs font-medium">
                  In Progress
                </span>

                <span className="text-xs font-semibold">
                  {inProgress}
                </span>

              </div>

              <Progress
                value={percentage(inProgress)}
                className="h-1.5"
              />

            </div>


            {/* PENDING */}

            <div>

              <div className="mb-1.5 flex items-center justify-between">

                <span className="text-xs font-medium">
                  Pending
                </span>

                <span className="text-xs font-semibold">
                  {pending}
                </span>

              </div>

              <Progress
                value={percentage(pending)}
                className="h-1.5"
              />

            </div>

          </CardContent>

        </Card>


        {/* =================================================
            AGENT WORKLOAD
        ================================================= */}

        <Card className="border-0 shadow-sm">

          <CardHeader className="pb-3">

            <CardTitle className="text-base">
              Agent Workload
            </CardTitle>

            <p className="text-xs text-muted-foreground">
              Complaints currently assigned to each agent
            </p>

          </CardHeader>

          <CardContent className="space-y-3">

            {agents.map((agent) => {

              const count =
                complaintList.filter(
                  (c) =>
                    c.supportAgent ===
                    agent.name
                ).length;

              return (

                <div
                  key={agent.id}
                  className="rounded-lg border bg-slate-50/50 p-3"
                >

                  <div className="mb-2 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">

                        <UserRound className="h-3.5 w-3.5 text-primary" />

                      </div>

                      <span className="text-xs font-medium">
                        {agent.name}
                      </span>

                    </div>

                    <Badge
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {count}
                    </Badge>

                  </div>

                  <Progress
                    value={percentage(count)}
                    className="h-1"
                  />

                </div>

              );

            })}

          </CardContent>

        </Card>

      </div>


      {/* ===================================================
          RECENT COMPLAINTS
      =================================================== */}

      <Card className="border-0 shadow-sm">

        <CardHeader className="flex flex-row items-center justify-between pb-3">

          <div>

            <CardTitle className="text-base">
              Recent Complaints 
            </CardTitle>

            <p className="mt-1 text-xs text-muted-foreground">
              Review and manage customer complaints
            </p>

          </div>

          <Badge
            variant="secondary"
            className="text-xs"
          >
            {complaintList.length} total
          </Badge>

        </CardHeader>


        <CardContent className="p-0">

          <div className="overflow-x-auto">

            <Table>

              <TableHeader>

                <TableRow className="bg-slate-50/70">

                  <TableHead className="pl-6 text-xs">
                    ID
                  </TableHead>

                  <TableHead className="text-xs">
                    Complaint
                  </TableHead>

                  <TableHead className="text-xs">
                    Customer
                  </TableHead>

                  <TableHead className="text-xs">
                    Status
                  </TableHead>

                  <TableHead className="text-xs">
                    Assigned Agent
                  </TableHead>

                  <TableHead className="pr-6 text-right text-xs">
                    Actions
                  </TableHead>

                </TableRow>

              </TableHeader>


              <TableBody>

                {complaintList.map(
                  (complaint) => (

                    <TableRow
                      key={complaint.id}
                      className="group"
                    >

                      {/* ID */}

                      <TableCell className="pl-6">

                        <span className="font-mono text-xs font-semibold text-primary">
                          #{complaint.id}
                        </span>

                      </TableCell>


                      {/* TITLE */}

                      <TableCell>

                        <div className="max-w-[220px]">

                          <p className="truncate text-sm font-medium">
                            {complaint.title}
                          </p>

                          <p className="text-[11px] text-muted-foreground">
                            Customer request
                          </p>

                        </div>

                      </TableCell>


                      {/* CUSTOMER */}

                      <TableCell>

                        <span className="text-xs text-muted-foreground">
                          {complaint.customerId}
                        </span>

                      </TableCell>


                      {/* STATUS */}

                      <TableCell>

                        <Badge
                          variant="outline"
                          className={`whitespace-nowrap text-[10px] ${getStatusStyle(
                            complaint.status
                          )}`}
                        >

                          {complaint.status}

                        </Badge>

                      </TableCell>


                      {/* AGENT */}

                      <TableCell>

                        <div className="relative">

                          {complaint.supportAgent ? (

                            <button
                              onClick={() =>
                                setAssigningComplaint(
                                  assigningComplaint ===
                                    complaint.id
                                    ? null
                                    : complaint.id
                                )
                              }
                              className="flex items-center gap-2 rounded-md px-2 py-1 text-xs transition hover:bg-slate-100"
                            >

                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">

                                <UserRound className="h-3 w-3 text-primary" />

                              </div>

                              <span className="max-w-[120px] truncate">
                                {complaint.supportAgent}
                              </span>

                            </button>

                          ) : (

                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs text-muted-foreground"
                              onClick={() =>
                                setAssigningComplaint(
                                  complaint.id
                                )
                              }
                            >

                              <UserPlus className="mr-1.5 h-3.5 w-3.5" />

                              Assign

                            </Button>

                          )}


                          {/* ASSIGN DROPDOWN */}

                          {assigningComplaint ===
                            complaint.id && (

                            <div className="absolute left-0 top-9 z-50 w-48 rounded-lg border bg-white p-1.5 shadow-xl">

                              <div className="border-b px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">

                                Assign agent

                              </div>

                              {agents.map(
                                (agent) => (

                                  <button
                                    key={
                                      agent.id
                                    }
                                    onClick={() =>
                                      handleAssign(
                                        complaint.id,
                                        agent.name
                                      )
                                    }
                                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-xs transition hover:bg-slate-100"
                                  >

                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">

                                      <UserRound className="h-3 w-3 text-primary" />

                                    </div>

                                    <span className="truncate">
                                      {agent.name}
                                    </span>

                                  </button>

                                )
                              )}

                            </div>

                          )}

                        </div>

                      </TableCell>


                      {/* ACTIONS */}

                      <TableCell className="pr-6 text-right">

                        <Button
                          size="sm"
                          className="h-7 gap-1.5 bg-slate-900 px-3 text-xs hover:bg-slate-800"
                          onClick={() =>
                            setSelectedComplaint(
                              complaint
                            )
                          }
                        >

                          <Eye className="h-3.5 w-3.5" />

                          View

                        </Button>

                      </TableCell>

                    </TableRow>

                  )
                )}

              </TableBody>

            </Table>

          </div>

        </CardContent>

      </Card>


      {/* ===================================================
          COMPLAINT DETAILS MODAL
      =================================================== */}

      {selectedComplaint && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between border-b px-5 py-4">

              <div>

                <p className="font-mono text-xs font-semibold text-primary">
                  #{selectedComplaint.id}
                </p>

                <h2 className="mt-1 text-lg font-bold">
                  {selectedComplaint.title}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedComplaint(
                    null
                  )
                }
                className="rounded-md p-1.5 text-muted-foreground transition hover:bg-slate-100 hover:text-foreground"
              >

                <X className="h-4 w-4" />

              </button>

            </div>


            {/* MODAL CONTENT */}

            <div className="max-h-[65vh] overflow-y-auto px-5 py-5">
  <div className="space-y-5">

    {/* TOP INFO */}
    <div className="grid grid-cols-2 gap-4">

      {/* CUSTOMER */}
      <div className="rounded-lg border bg-white p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Customer
        </p>

        <p className="mt-1 text-sm font-medium">
          {selectedComplaint.customerId}
        </p>
      </div>


      {/* STATUS */}
      <div className="rounded-lg border bg-white p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Status
        </p>

        <Badge
          variant="outline"
          className={`mt-1 text-[10px] ${getStatusStyle(
            selectedComplaint.status
          )}`}
        >
          {selectedComplaint.status}
        </Badge>
      </div>


      {/* AGENT */}
      <div className="rounded-lg border bg-white p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Assigned Agent
        </p>

        <p className="mt-1 text-sm font-medium">
          {selectedComplaint.supportAgent ||
            "Not assigned"}
        </p>
      </div>


      {/* PRIORITY */}
      <div className="rounded-lg border bg-white p-3">
        <div className="flex items-center justify-between">

          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Priority
          </p>

          {selectedComplaint.priority === "Urgent" && (
            <span className="flex items-center gap-1 text-[9px] font-semibold text-red-600">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Immediate
            </span>
          )}

        </div>

        <div className="mt-2 flex gap-1.5">

          {/* NORMAL */}
          <button
            type="button"
            onClick={() =>
              updatePriority(
                selectedComplaint.id,
                "Normal"
              )
            }
            className={`flex-1 rounded-md border px-2 py-1.5 text-[10px] font-medium transition-all ${
              (selectedComplaint.priority || "Normal") ===
              "Normal"
                ? "border-blue-300 bg-blue-50 text-blue-700 shadow-sm"
                : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            Normal
          </button>

          {/* HIGH */}
          <button
            type="button"
            onClick={() =>
              updatePriority(
                selectedComplaint.id,
                "High"
              )
            }
            className={`flex-1 rounded-md border px-2 py-1.5 text-[10px] font-medium transition-all ${
              selectedComplaint.priority === "High"
                ? "border-orange-300 bg-orange-50 text-orange-700 shadow-sm"
                : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            High
          </button>

          {/* URGENT */}
          <button
            type="button"
            onClick={() =>
              updatePriority(
                selectedComplaint.id,
                "Urgent"
              )
            }
            className={`flex-1 rounded-md border px-2 py-1.5 text-[10px] font-medium transition-all ${
              selectedComplaint.priority === "Urgent"
                ? "border-red-300 bg-red-50 text-red-700 shadow-sm"
                : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            Urgent
          </button>

        </div>
      </div>
    </div>


    {/* URGENT NOTICE */}
    {selectedComplaint.priority === "Urgent" && (
      <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100">
          <span className="text-sm">!</span>
        </div>

        <div>
          <p className="text-xs font-semibold text-red-800">
            Urgent complaint
          </p>

          <p className="text-[10px] text-red-700">
            This ticket should be handled as soon as possible.
          </p>
        </div>
      </div>
    )}


    {/* DESCRIPTION */}
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        Complaint Description
      </p>

      <div className="mt-2 rounded-lg border bg-slate-50 p-4 text-sm leading-6 text-slate-700">
        {selectedComplaint.description ||
          "No description provided."}
      </div>
    </div>

  </div>
</div>


            {/* MODAL FOOTER */}

            <div className="flex justify-end gap-2 border-t bg-slate-50 px-5 py-3">

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSelectedComplaint(
                    null
                  )
                }
              >
                Close
              </Button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}