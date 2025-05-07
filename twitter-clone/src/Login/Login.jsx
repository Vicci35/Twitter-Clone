import React from "react";
import "../Login/login.css";

const LogIn = () => {
  return (
    <>
      <div>
        <h1>Logga in på Twitter</h1>
        <input
          type="text"
          placeholder="Mobil, e-postadress eller användarnamn"
        ></input>
        <br />
        <br />
        <button class="next">Nästa</button>
        <br />
        <br />
        <button class="forgot-password">Har du glömt lösenord?</button>
        <br />
        <br />
        <h6>
          Har du inget konto? <a href="#"> Registrera dig</a>
        </h6>
      </div>
    </>
  );
};

export default LogIn;
