import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LogIn from "./components/Login/LoginStep1";
import LogInStep2 from "./components/Login/LogInStep2";
import SignUp from "./components/SignUp/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/login/password" element={<LogInStep2 />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
