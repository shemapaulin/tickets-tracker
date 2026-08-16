import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { agents } from "@/Services/agents";
import { complaints } from "@/Services/complaints";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  LayoutDashboard,
  ClipboardList,

  Bell,
  LogOut,
 
  CheckCircle2,
  Clock3,
  ArrowRight,
  CircleDot,
  BriefcaseBusiness,
  Mail,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type ComplaintStatus =
  | "Submitted"
  | "Under Review"
  | "In Progress"
  | "Resolved";

type Page =
  | "dashboard"
  | "complaints";

/* =========================================================
   STATUS CONFIG
========================================================= */

const statusConfig: Record<
  ComplaintStatus,
  {
    label: string;
    color: string;
    bg: string;
    icon: React.ElementType;
  }
> = {
  Submitted: {
    label: "Submitted",
    color: "text-slate-600",
    bg: "bg-slate-100",
    icon: CircleDot,
  },

  "Under Review": {
    label: "Under Review",
    color: "text-amber-600",
    bg: "bg-amber-50",
    icon: Clock3,
  },

  "In Progress": {
    label: "In Progress",
    color: "text-blue-600",
    bg: "bg-blue-50",
    icon: ArrowRight,
  },

  Resolved: {
    label: "Resolved",
    color: "text-green-600",
    bg: "bg-green-50",
    icon: CheckCircle2,
  },
};

/* =========================================================
   COMPONENT
========================================================= */

export default function AgentDashboard() {

  const { id } = useParams();

  const [page, setPage] =
    useState<Page>("dashboard");

  /*
   * Local copy of complaints.
   *
   * This allows the UI to immediately move
   * complaints between columns.
   *
   * Later this will be replaced with your API.
   */

  const [agentComplaints, setAgentComplaints] =
    useState(complaints);

  /* =======================================================
     FIND AGENT
  ======================================================= */

  const agent = agents.find(
    (a: (typeof agents)[number]) =>
      a.id === Number(id)
  );

  if (!agent) {
    return (
      <Navigate
        to="/agent/login"
        replace
      />
    );
  }

  /* =======================================================
     ONLY ASSIGNED COMPLAINTS
  ======================================================= */

  const assignedComplaints =
    agentComplaints.filter(
      (complaint) =>
        complaint.supportAgent === agent.name
    );

  /* =======================================================
     STATISTICS
  ======================================================= */

  
  const underReviewCount =
    assignedComplaints.filter(
      (complaint) =>
        complaint.status === "Under Review"
    ).length;

  const inProgressCount =
    assignedComplaints.filter(
      (complaint) =>
        complaint.status === "In Progress"
    ).length;

  const resolvedCount =
    assignedComplaints.filter(
      (complaint) =>
        complaint.status === "Resolved"
    ).length;

  /* =======================================================
     STATUS COLUMNS
  ======================================================= */

  const statusColumns: ComplaintStatus[] = [
    "Submitted",
    "Under Review",
    "In Progress",
    "Resolved",
  ];

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleSignOut = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href =
      "/agent/login";
  };

  /* =======================================================
     UPDATE COMPLAINT STATUS
  ======================================================= */

  const updateComplaintStatus = (
    complaintId: number,
    newStatus: ComplaintStatus
  ) => {

    setAgentComplaints(
      (previous) =>
        previous.map((complaint) => {

          if (
            complaint.id === complaintId
          ) {

            return {
              ...complaint,
              status: newStatus,
            };

          }

          return complaint;
        })
    );

    /*
     * REAL API WILL GO HERE
     *
     * Example:
     *
     * await updateComplaint(
     *   complaintId,
     *   newStatus
     * );
     */
  };

  /* =======================================================
     DRAG START
  ======================================================= */

  const handleDragStart = (
    event: React.DragEvent,
    complaintId: number
  ) => {

    event.dataTransfer.setData(
      "complaintId",
      String(complaintId)
    );
  };

  /* =======================================================
     DROP
  ======================================================= */

  const handleDrop = (
    event: React.DragEvent,
    status: ComplaintStatus
  ) => {

    event.preventDefault();

    const complaintId =
      Number(
        event.dataTransfer.getData(
          "complaintId"
        )
      );

    if (!complaintId) return;

    updateComplaintStatus(
      complaintId,
      status
    );
  };

  /* =======================================================
     DRAG OVER
  ======================================================= */

  const handleDragOver = (
    event: React.DragEvent
  ) => {

    event.preventDefault();
  };

  /* =======================================================
     MEMOIZED COUNTS
  ======================================================= */

  const stats = useMemo(
    () => [
      {
        label: "Assigned",
        value:
          assignedComplaints.length,
        icon: ClipboardList,
        color:
          "bg-violet-50 text-violet-600",
      },

      {
        label: "Under Review",
        value:
          underReviewCount,
        icon: Clock3,
        color:
          "bg-amber-50 text-amber-600",
      },

      {
        label: "In Progress",
        value:
          inProgressCount,
        icon: ArrowRight,
        color:
          "bg-blue-50 text-blue-600",
      },

      {
        label: "Resolved",
        value:
          resolvedCount,
        icon: CheckCircle2,
        color:
          "bg-green-50 text-green-600",
      },
    ],
    [
      assignedComplaints.length,
      underReviewCount,
      inProgressCount,
      resolvedCount,
    ]
  );

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">

        <div className="flex h-16 items-center justify-between px-6">

          {/* BRAND */}

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">

              <BriefcaseBusiness
                className="h-5 w-5"
              />

            </div>

            <div>

              <h1 className="text-sm font-bold sm:text-base">
                Complaint Management
              </h1>

              <p className="hidden text-xs text-muted-foreground sm:block">
                Agent Portal
              </p>

            </div>

          </div>


          {/* RIGHT */}

          <div className="flex items-center gap-5">

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
            >

              <Bell className="h-5 w-5" />

            </Button>


            <div className="hidden h-8 w-px bg-border sm:block" />


            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">

                {agent.name
                  .charAt(0)
                  .toUpperCase()}

              </div>

              <div className="hidden sm:block">

                <p className="text-sm font-semibold">
                  {agent.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  Support Agent
                </p>

              </div>

            </div>

          </div>

        </div>

      </header>


      {/* =================================================
          BODY
      ================================================= */}

      <div className="flex">

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="hidden min-h-[calc(100vh-64px)] w-60 border-r bg-white lg:block">

          <div className="flex h-full flex-col p-4">

            <div className="space-y-1">

              <Button
                variant={
                  page === "dashboard"
                    ? "secondary"
                    : "ghost"
                }
                className="w-full justify-start"
                onClick={() =>
                  setPage("dashboard")
                }
              >

                <LayoutDashboard className="mr-3 h-4 w-4" />

                Dashboard

              </Button>


              

               

            </div>


            {/* LOGOUT */}

            <div className="mt-auto">

              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={
                  handleSignOut
                }
              >

                <LogOut className="mr-3 h-4 w-4" />

                Logout

              </Button>

            </div>

          </div>

        </aside>


        {/* =================================================
            MAIN
        ================================================= */}

        <main className="min-w-0 flex-1 p-4 md:p-8">

          {/* =================================================
              DASHBOARD
          ================================================= */}

          {page === "dashboard" && (

            <div className="mx-auto max-w-[1600px]">

              {/* HEADER */}

              <div className="mb-8">

                <p className="text-sm font-medium text-primary">
                  Agent Dashboard
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight">
                  Welcome back,{" "}
                  {agent.name.split(" ")[0]}
                </h1>

                <p className="mt-2 text-muted-foreground">
                  Here's an overview of your
                  assigned customer complaints.
                </p>

              </div>


              {/* =================================================
                  AGENT OVERVIEW CARD
              ================================================= */}

              <Card className="overflow-hidden border-0 shadow-sm ">

                <CardContent className="p-0">

                  <div className="grid lg:grid-cols-[1.3fr_2fr]">

                    {/* AGENT */}

                    <div className="relative overflow-hidden bg-slate-950 p-7 text-white rounded-lg">

                      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />

                      <div className="relative">

                        <div className="flex items-center gap-4">

                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold ring-1 ring-white/10">

                            {agent.name
                              .charAt(0)
                              .toUpperCase()}

                          </div>

                          <div>

                            <p className="text-sm text-white/50">
                              Support Agent
                            </p>

                            <h2 className="text-xl font-bold">
                              {agent.name}
                            </h2>

                          </div>

                        </div>


                        {/* INFO */}

                        <div className="mt-8 space-y-4">

                          <div className="flex items-center gap-3 text-sm">

                            <BriefcaseBusiness className="h-4 w-4 text-white/50" />

                            <span className="text-white/60">
                              Department
                            </span>

                            <span className="ml-auto font-medium">
                              {agent.department}
                            </span>

                          </div>


                          <div className="flex items-center gap-3 text-sm">

                            <Mail className="h-4 w-4 text-white/50" />

                            <span className="text-white/60">
                              Email
                            </span>

                            <span className="ml-auto max-w-[180px] truncate font-medium">
                              {agent.email}
                            </span>

                          </div>


                          <div className="flex items-center gap-3 text-sm">

                            <CircleDot className="h-4 w-4 text-green-400" />

                            <span className="text-white/60">
                              Status
                            </span>

                            <span className="ml-auto rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400">

                              {agent.status}

                            </span>

                          </div>

                        </div>

                      </div>

                    </div>


                    {/* STATISTICS */}

                    <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">

                      {stats.map(
                        (stat) => {

                          const Icon =
                            stat.icon;

                          return (

                            <div
                              key={
                                stat.label
                              }
                              className="bg-white p-6"
                            >

                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}
                              >

                                <Icon className="h-5 w-5" />

                              </div>

                              <p className="mt-5 text-3xl font-bold tracking-tight">

                                {
                                  stat.value
                                }

                              </p>

                              <p className="mt-1 text-sm text-muted-foreground">

                                {
                                  stat.label
                                }

                              </p>

                            </div>

                          );

                        }
                      )}

                    </div>

                  </div>

                </CardContent>

              </Card>


              {/* =================================================
                  COMPLAINT BOARD
              ================================================= */}

              <div className="mt-10">

                <div className="mb-5 flex items-end justify-between">

                  <div>

                    <h2 className="text-xl font-bold">
                      Assigned Complaints
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Drag complaints between stages
                      or click one to view details.
                    </p>

                  </div>

                  <Button
                    variant="outline"
                    onClick={() =>
                      setPage(
                        "complaints"
                      )
                    }
                  >

                    <ClipboardList className="mr-2 h-4 w-4" />

                    View All

                  </Button>

                </div>


                {/* BOARD */}

                <div className="grid min-w-[1100px] grid-cols-4 gap-4">

                  {statusColumns.map(
                    (status) => {

                      const config =
                        statusConfig[
                          status
                        ];

                      const Icon =
                        config.icon;

                      const columnComplaints =
                        assignedComplaints.filter(
                          (complaint) =>
                            complaint.status ===
                            status
                        );

                      return (

                        <div
                          key={status}
                          onDragOver={
                            handleDragOver
                          }
                          onDrop={(event) =>
                            handleDrop(
                              event,
                              status
                            )
                          }
                          className="rounded-2xl bg-slate-100/80 p-3"
                        >

                          {/* COLUMN HEADER */}

                          <div className="mb-3 flex items-center justify-between px-2">

                            <div className="flex items-center gap-2">

                              <div
                                className={`flex h-7 w-7 items-center justify-center rounded-lg ${config.bg} ${config.color}`}
                              >

                                <Icon className="h-4 w-4" />

                              </div>

                              <h3 className="text-sm font-semibold">
                                {status}
                              </h3>

                            </div>

                            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium shadow-sm">

                              {
                                columnComplaints.length
                              }

                            </span>

                          </div>


                          {/* COMPLAINTS */}

                          <div className="min-h-[280px] space-y-3">

                            {columnComplaints.map(
                              (
                                complaint
                              ) => (

                                <Card
                                  key={
                                    complaint.id
                                  }
                                  draggable
                                  onDragStart={(
                                    event
                                  ) =>
                                    handleDragStart(
                                      event,
                                      complaint.id
                                    )
                                  }
                                  className="cursor-grab border-0 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing"
                                >

                                  <CardContent className="p-4">

                                    <div className="flex items-start justify-between gap-3">

                                      <div className="min-w-0">

                                        <p className="text-xs font-semibold text-primary">

                                          #
                                          {
                                            complaint.id
                                          }

                                        </p>

                                        <h4 className="mt-1 line-clamp-2 text-sm font-semibold">

                                          {
                                            complaint.title ||
                                            complaint.description ||
                                            "Customer Complaint"
                                          }

                                        </h4>

                                      </div>

                                      <span className="text-xs text-muted-foreground">
                                        ⋮⋮
                                      </span>

                                    </div>


                                    {/* CUSTOMER */}

                                    <div className="mt-4 flex items-center gap-2">

                                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold">

                                        C

                                      </div>

                                      <span className="truncate text-xs text-muted-foreground">

                                        Customer

                                      </span>

                                    </div>


                                    {/* STATUS */}

                                    <div className="mt-4">

                                      <select
                                        value={
                                          complaint.status
                                        }
                                        onChange={(
                                          event
                                        ) =>
                                          updateComplaintStatus(
                                            complaint.id,
                                            event
                                              .target
                                              .value as ComplaintStatus
                                          )
                                        }
                                        onClick={(
                                          event
                                        ) =>
                                          event.stopPropagation()
                                        }
                                        className="h-8 w-full rounded-md border bg-white px-2 text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20"
                                      >

                                        {statusColumns.map(
                                          (
                                            option
                                          ) => (

                                            <option
                                              key={
                                                option
                                              }
                                              value={
                                                option
                                              }
                                            >
                                              {
                                                option
                                              }
                                            </option>

                                          )
                                        )}

                                      </select>

                                    </div>

                                  </CardContent>

                                </Card>

                              )
                            )}


                            {/* EMPTY */}

                            {columnComplaints.length ===
                              0 && (

                              <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/50">

                                <div className="text-center">

                                  <p className="text-sm font-medium text-muted-foreground">
                                    No complaints
                                  </p>

                                  <p className="mt-1 text-xs text-muted-foreground/70">
                                    Drop a complaint here
                                  </p>

                                </div>

                              </div>

                            )}

                          </div>

                        </div>

                      );

                    }
                  )}

                </div>

              </div>

            </div>

          )}


         

        </main>

      </div>

    </div>
  );
}