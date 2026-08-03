import { Route, Routes } from "react-router-dom";
import AgentLogin from "./Agent/login";
function App() {

  return (
    <>
     <Routes>

      <Route 
        path="/agent/login"
        element={<AgentLogin />}
      />

    </Routes>

    </>
  )
}

export default App
