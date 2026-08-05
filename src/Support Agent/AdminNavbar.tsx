import { Bell, UserCircle2 } from "lucide-react";

export default function AdminNavbar() {
  return (
    <header className="h-16 border-b bg-white shadow-sm px-8 flex items-center justify-between">

      <div>
        <h1 className="text-2xl font-bold text-primary">
          Complaint Management System
        </h1>

        <p className="text-sm text-muted-foreground">
          Administrator Panel
        </p>
      </div>

      <div className="flex items-center gap-6">

        <Bell className="cursor-pointer text-gray-500 hover:text-primary transition" />

        <div className="flex items-center gap-3">

          <UserCircle2
            size={42}
            className="text-primary"
          />

          <div>

            <h3 className="font-semibold">
              Administrator
            </h3>

            <p className="text-sm text-muted-foreground">
              System Admin
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}