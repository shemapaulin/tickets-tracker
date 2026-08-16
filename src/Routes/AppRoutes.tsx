import { Routes, Route, Navigate } from "react-router-dom";

/* Customer */
import Dashboard from "@/Customer/dashboard";

/* Support Agent */
import Login from "@/Agent/login";
import AgentDashboard from "@/Agent/agentDashboard";

/* Admin */
import AdminLogin from "@/Support Agent/login";
import AdminDashboard from "@/Support Agent/adminDashboard";
import Feedback from "@/Customer/feedback";
import CustomerHome from "@/Customer/homepage";
export default function AppRouter() {
  return (
    <Routes>

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to="/home" replace />}
      />

      {/* ================= CUSTOMER ================= */}

      <Route
        path="/home"
        element={<CustomerHome />}
      />

      <Route
        path="/customer/dashboard/:id"
        element={<Dashboard />}
      />

      <Route
        path="/dashboard/feedback/"
        element={<Feedback />}
      />

      {/* ================= SUPPORT AGENT ================= */}

      <Route
        path="/agent/login"
        element={<Login />}
      />

      <Route
        path="/agent/dashboard/:id"
        element={<AgentDashboard />}
      />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin/dashboard/:id"
        element={<AdminDashboard />}
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">
              404 - Page Not Found
            </h1>
          </div>
        }
      />

    </Routes>
  );
}