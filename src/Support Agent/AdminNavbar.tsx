import { Bell, UserCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminNavbar() {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/agent/login";
  }
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

          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserCircle2
                size={42}
                className="text-primary"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>

      </div>

    </header>
  );
}