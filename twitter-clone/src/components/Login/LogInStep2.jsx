import React from "react";
import "../Login/login.css";

const LogInStep2 = () => {
  return (
    <div>
      <h2>Ange ditt lösenord</h2>
      <br />
      <form id="login-form">
        <div className="Login2-container">
          <input type="text" placeholder="E-post" />
          <br />
          <br />
          <input type="text" placeholder="Lösenord" />
          <br />
          <h6>
            <a className="forgot-password-tag" href="#">
              Har du glömt lösenord?
            </a>
          </h6>
          <br />
          <br />
          <button className="LoggaIn">Logga in</button>
        </div>
      </form>
    </div>
  );
};

export default LogInStep2;
