import { Route, Routes } from "react-router-dom";
import AdminLogin from "@/Support Agent/login"
import AdminDashboard from "./Support Agent/adminDashboard";
function App() {

  return (
    <>
     <Routes>

      <Route 
        path="/admin/login"
        element={<AdminLogin />}
      />
      <Route
        path="/admin/dashboard/:id"
  element={<AdminDashboard />}
      />

    </Routes>

    </>
  )
}

export default App
