import React, { useState } from "react";
import "../Login/login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginStep1 = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleNext = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: inputValue }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Ogiltig e-post eller användarnamn.");
        return;
      }

      navigate("/login/password", { state: { identifier: inputValue } });
    } catch (error) {
      setError("Serverfel - Försök igen.");
    }
  };
  return (
    <>
      <div>
        <h1>Logga in på Twitter</h1>
        <form className="step1-form" onSubmit={handleNext}>
          <div className="step1-container">
            <input
              type="text"
              placeholder="E-postadress eller användarnamn"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <br />
            {error && <p className="error-message">{error}</p>}
            <br />
            <button className="next" type="submit">
              Nästa
            </button>
            <br />
            <br />
          </div>
        </form>

        <br />
        <br />
        <h6>
          <Link id="sign-up" to={"/sign-up"}>
            Inget konto? Skapa ett här
          </Link>
        </h6>
      </div>
    </>
  );
};

export default LoginStep1;
