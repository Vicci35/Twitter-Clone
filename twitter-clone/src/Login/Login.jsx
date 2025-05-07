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
      </div>
    </>
  );
};

export default LogIn;
