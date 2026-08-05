import { useState } from "react";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSideBar";
import DashboardHome from "./AdminDashboardHome";
import AllComplaints from "./AllComplaints";

export default function AdminDashboard() {
  const [page, setPage] = useState<
    "dashboard" | "All Tickets" | "resolved" | "reports"
  >("dashboard");

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <AdminNavbar />

      <div className="flex">

        {/* Sidebar */}
        <AdminSidebar
          page={page}
          setPage={setPage}
        />

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">

          {/* Dashboard */}
          {page === "dashboard" && (
            <DashboardHome />
          )}

          {/* All Tickets */}
          {page === "All Tickets" && (
            <AllComplaints/>
          )}

          {/* Resolved Tickets */}
          {page === "resolved" && (
            <div className="space-y-6">

              <div>
                <h1 className="text-4xl font-bold">
                  Resolved Tickets
                </h1>

                <p className="text-muted-foreground">
                  View all complaints that have been resolved.
                </p>
              </div>

            </div>
          )}

          {/* Reports */}
          {page === "reports" && (
            <div className="space-y-6">

              <div>
                <h1 className="text-4xl font-bold">
                  Reports
                </h1>

                <p className="text-muted-foreground">
                  View complaint statistics and performance reports.
                </p>
              </div>

            </div>
          )}

        </main>

      </div>

    </div>
  );
}