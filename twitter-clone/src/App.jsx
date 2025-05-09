import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LogInStep2 from "./components/Login/LogInStep2";
import SignUp from "./components/SignUp/SignUp";
import LoginStep1 from "./components/Login/LoginStep1";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginStep1 />} />
        <Route path="/login/password" element={<LogInStep2 />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
