import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./Login/LoginStep1";
import LogInStep2 from "./Login/LogInStep2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/login/password" element={<LogInStep2 />} />
      </Routes>
    </Router>
  );
}

export default App;
