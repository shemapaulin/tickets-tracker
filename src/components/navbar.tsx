import { Link } from "react-router-dom";
import {
  Bell,
  LayoutDashboard,
  Menu,
  Ticket,
  FileText,
  UserCircle,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {

  const handleSignOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/home";
};
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-xl font-bold"
        >
          <Ticket className="h-6 w-6 text-primary" />
          ComplaintDesk
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/customer/dashboard/:id"
            className="flex items-center gap-2 hover:text-primary"
          >
            <LayoutDashboard size={18} />
           Home
          </Link>

          

          <Link
            to="/dashboard/feedback"
            className="flex items-center gap-2 hover:text-primary"
          >
            <FileText size={18} />
            Feedback
          </Link>

          <Link
            to="/help"
            className="hover:text-primary"
          >
            Help
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost">
                <UserCircle className="mr-2 h-5 w-5" />
                Admin
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <div className="mt-8 flex flex-col gap-6">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/tickets">Tickets</Link>
                <Link to="/complaints">Complaints</Link>
                <Link to="/reports">Reports</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}