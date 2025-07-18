import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Login/login.css";

const LogInStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state?.identifier) {
      setIdentifier(location.state.identifier);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Felmeddelande:", data.message || "Något gick fel");
        setError(data.message || "Något gick fel");
        return;
      }

      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Ett tekniskt fel inträffade, försök igen.");
    }
  };
  return (
    <div>
      <h2>Ange ditt lösenord</h2>
      <br />
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="E-post eller användarnamn"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <br />
        <br />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Lösenord"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Dölj" : "Visa"}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
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
