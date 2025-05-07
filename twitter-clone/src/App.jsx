import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LogIn from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
