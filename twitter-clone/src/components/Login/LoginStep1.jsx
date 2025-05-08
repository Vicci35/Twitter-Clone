import React, { use } from "react";
import "../Login/login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/login/password");
  };
  return (
    <>
      <div>
        <h1>Logga in på Twitter</h1>
        <form className="step1-form" onSubmit={handleNext}>
          <div className="step1-container">
            <input
              type="text"
              placeholder="Mobil, e-postadress eller användarnamn"
            ></input>
            <br />
            <br />
            <button className="next" type="submit">
              Nästa
            </button>
            <br />
            <br />
            <button type="button" className="forgot-password">
              Har du glömt lösenord?
            </button>
          </div>
        </form>

        <br />
        <br />
        <h6>
          <Link to={"/sign-up"}>Inget konto? Skapa ett här:</Link>
        </h6>
      </div>
    </>
  );
};

export default LogIn;
