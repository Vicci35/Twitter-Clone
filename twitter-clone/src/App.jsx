import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./utils/UserContext";
import LogInStep2 from "./components/Login/LogInStep2";
import SignUp from "./components/SignUp/SignUp";
import LoginStep1 from "./components/Login/LoginStep1";
import ProtectedRoute from "./utils/ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Dashboard/Header/Profile/Profile";
import UserSettings from "./components/Dashboard/Header/UserSettings/UserSettings";
import UsersProfile from "./components/Dashboard/Header/Profile/UsersProfile";
import "./App.css";


function App() {
  return (
  
    <Router>
      <UserProvider>
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
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-settings"
            element={
              <ProtectedRoute>
                <UserSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                <UsersProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
