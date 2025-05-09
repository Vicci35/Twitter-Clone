import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LogInStep2 from "./components/Login/LogInStep2";
import SignUp from "./components/SignUp/SignUp";
import LoginStep1 from "./components/Login/LoginStep1";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginStep1 />} />
        <Route path="/login/password" element={<LogInStep2 />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
