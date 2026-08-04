import { Route, Routes } from "react-router-dom";
import AgentLogin from "./Agent/login";
import AgentDashboard from "./Agent/agentDashboard";
function App() {

  return (
    <>
     <Routes>

      <Route 
        path="/agent/login"
        element={<AgentLogin />}
      />
      <Route
        path="/agent/dashboard/:id"
  element={<AgentDashboard />}
      />

    </Routes>

    </>
  )
}

export default App
