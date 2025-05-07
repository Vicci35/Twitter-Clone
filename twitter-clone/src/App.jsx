import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./Login/LoginStep1";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
