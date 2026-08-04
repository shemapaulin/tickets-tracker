import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { agents } from "@/Services/agents";
import { complaints } from "@/Services/complaints";

import MyComplaints from "./mycomplaints";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  LayoutDashboard,
  ClipboardList,
  User,
  Bell,
  LogOut,
} from "lucide-react";

export default function AgentDashboard() {
  const { id } = useParams();

  const [page, setPage] = useState<
    "dashboard" | "complaints"
  >("dashboard");

  const agent = agents.find(
    (a: (typeof agents)[number]) => a.id === Number(id)
  );

  if (!agent) {
    return <Navigate to="/agent/login" replace />;
  }

  const assignedComplaints = complaints.filter(
    (complaint) =>
      complaint.supportAgent === agent.name
  );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= NAVBAR ================= */}

      <header className="bg-white border-b shadow-sm">

        <div className="flex h-16 items-center justify-between px-6">

          <h1 className="text-xl font-bold text-primary">
            Complaint Management System
          </h1>

          <div className="flex items-center gap-5">

            <Bell className="cursor-pointer" />

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">

                <User size={18} />

              </div>

              <div>

                <p className="font-semibold">
                  {agent.name.split(" ")[0]}
                </p>

                <p className="text-xs text-gray-500">
                  Agent
                </p>

              </div>

            </div>

          </div>

        </div>

      </header>

      {/* ================= BODY ================= */}

      <div className="flex">

        {/* ================= SIDEBAR ================= */}

        <aside className="w-64 min-h-[calc(100vh-64px)] bg-white border-r">

          <div className="p-4 space-y-2">

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
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>

            <Button
              variant={
                page === "complaints"
                  ? "secondary"
                  : "ghost"
              }
              className="w-full justify-start"
              onClick={() =>
                setPage("complaints")
              }
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              My Complaints
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <User className="mr-2 h-4 w-4" />
              My Profile
            </Button>

            <Button
              variant="destructive"
              className="mt-10 w-full justify-start"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>

          </div>

        </aside>

        {/* ================= MAIN ================= */}

        <main className="flex-1 p-8">

          {page === "dashboard" && (
            <>
              <h1 className="text-3xl font-bold mb-8">
                Welcome back,{" "}
                {agent.name.split(" ")[0]}
              </h1>

              <div className="grid md:grid-cols-3 gap-6">

                <Card>

                  <CardHeader>

                    <CardTitle>
                      Department
                    </CardTitle>

                  </CardHeader>

                  <CardContent>

                    <p className="text-3xl font-bold">
                      {agent.department}
                    </p>

                  </CardContent>

                </Card>

                <Card>

                  <CardHeader>

                    <CardTitle>
                      Status
                    </CardTitle>

                  </CardHeader>

                  <CardContent>

                    <p className="text-3xl font-bold text-green-600">
                      {agent.status}
                    </p>

                  </CardContent>

                </Card>

                <Card>

                  <CardHeader>

                    <CardTitle>
                      Assigned Complaints
                    </CardTitle>

                  </CardHeader>

                  <CardContent>

                    <p className="text-3xl font-bold">
                      {
                        assignedComplaints.length
                      }
                    </p>

                  </CardContent>

                </Card>

              </div>

              <Card className="mt-8">

                <CardHeader>

                  <CardTitle>
                    Agent Information
                  </CardTitle>

                </CardHeader>

                <CardContent className="space-y-3">

                  <p>
                    <strong>Name:</strong>{" "}
                    {agent.name}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {agent.email}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {agent.phone}
                  </p>

                  <p>
                    <strong>Department:</strong>{" "}
                    {agent.department}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {agent.status}
                  </p>

                </CardContent>

              </Card>
            </>
          )}

          {page === "complaints" && (
            <MyComplaints
              complaints={assignedComplaints}
            />
          )}

        </main>

      </div>

    </div>
  );
}