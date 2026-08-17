import { useEffect, useState } from "react";
import { Bell, ChevronDown, UserCircle2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LoggedInUser {
  id?: number;
  name?: string;
  firstName?: string;
  first_name?: string;
  fullName?: string;
  email?: string;
}

export default function AdminNavbar() {
  const [user, setUser] = useState<LoggedInUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data:", error);
      }
    }
  }, []);

  const getFirstName = () => {
  if (!user) return "Admin";

  if (user.firstName) {
    return user.firstName;
  }

  if ((user as any).first_name) {
    return (user as any).first_name;
  }

  if (user.name) {
    return user.name.trim().split(" ")[0];
  }

  if ((user as any).fullName) {
    return (user as any).fullName.trim().split(" ")[0];
  }

  return "Admin";
};

  const firstName = getFirstName();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/agent/login";
  };

  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-5 shadow-sm">
      
      {/* Brand */}
      <div className="leading-tight">
        <h1 className="text-lg font-bold tracking-tight text-primary">
          Support Desk
        </h1>

        <p className="text-[11px] text-muted-foreground">
          Administrator Panel
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">

  {/* Notifications */}
  <button
    type="button"
    className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-primary"
  >
    <Bell className="h-[18px] w-[18px]" />

    <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
  </button>

  {/* User */}
  <DropdownMenu>
    <DropdownMenuTrigger>
      <div className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-muted/70">

        <UserCircle2 className="h-8 w-8 text-primary" />

        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold leading-none">
            {firstName}
          </p>

          <p className="mt-1 text-[10px] text-muted-foreground">
            Administrator
          </p>
        </div>

        <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />

      </div>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      align="end"
      className="w-48"
    >
      <DropdownMenuLabel>
        <div>
          <p className="text-sm font-semibold">
            {user?.name || firstName}
          </p>

          {user?.email && (
            <p className="truncate text-xs font-normal text-muted-foreground">
              {user.email}
            </p>
          )}
        </div>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        onClick={handleSignOut}
        className="cursor-pointer text-red-600 focus:text-red-600"
      >
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

</div>
    </header>
  );
}