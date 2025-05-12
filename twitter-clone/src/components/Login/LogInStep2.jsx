import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/login.css";

const LogInStep2 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Felmeddelande:", data.message || "Något gick fel");
        return;
      }

      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div>
      <h2>Ange ditt lösenord</h2>
      <br />
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <h6>
          <a className="forgot-password-tag" href="#">
            Har du glömt lösenord?
          </a>
        </h6>
        <br />
        <br />
        <button className="LoggaIn">Logga in</button>
      </form>
    </div>
  );
};

export default LogInStep2;
