import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LogIn from "./Login/login";
import SignUp from "./SignUp/SignUp";

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
