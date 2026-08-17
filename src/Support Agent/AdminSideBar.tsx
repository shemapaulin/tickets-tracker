import { Button } from "@/components/ui/button";

import {
  LayoutDashboard,
 
  BarChart3,
} from "lucide-react";

interface Props {
  page: string;
  setPage: (
    page: "dashboard" | "All Tickets" | "resolved" | "reports"
  ) => void;
}

export default function AdminSidebar({
  page,
  setPage,
}: Props) {
  return (
    <aside className="w-72 border-r bg-white min-h-[calc(100vh-64px)]">

      <div className="p-5">

        <h2 className="font-bold text-lg mb-6">
          MENU
        </h2>

        <div className="space-y-3">

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
            <LayoutDashboard className="mr-2 h-5 w-5" />

            Dashboard
          </Button>

          <Button
            variant={
              page === "All Tickets"
                ? "secondary"
                : "ghost"
            }
            className="w-full justify-start"
            onClick={() =>
              setPage("All Tickets")
            }
          > 
            <LayoutDashboard className="mr-2 h-5 w-5" />

            All Tickets
          </Button>

          

          <Button
            variant={
              page === "reports"
                ? "secondary"
                : "ghost"
            }
            onClick={() =>
              setPage("reports")
            }
            className="w-full justify-start"
          >
            <BarChart3 className="mr-2 h-5 w-5" />

            Reports
          </Button>

        </div>

      </div>

    </aside>
  );
}