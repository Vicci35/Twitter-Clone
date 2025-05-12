import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogInStep2 from "./components/Login/LogInStep2";
import SignUp from "./components/SignUp/SignUp";
import LoginStep1 from "./components/Login/LoginStep1";
import ProtectedRoute from "./utils/ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import UserSettings from "./components/Dashboard/UserSettings/UserSettings";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginStep1 />} />
        <Route path="/login/password" element={<LogInStep2 />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="user-settings"
          element={
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
