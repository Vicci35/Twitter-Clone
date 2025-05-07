import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/*import LogIn from "./Login/login";*/
import Home from "../src/Home/Home.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
