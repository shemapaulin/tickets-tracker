import Navbar from "@/components/navbar";
import Dashboardhome from "./dashboardhome";
import Feedback from "./feedback";

import {  Routes, Route } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route 
          index
          element={<Dashboardhome />}
        />

        <Route
          path="feedback"
          element={<Feedback />}
        />

        <Route
          path="feedback/:id"
          element={<Feedback />}
        />
      </Routes>
    </>
  );
};

export default Dashboard;