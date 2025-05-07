import React from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  return (
    <>
      <div>
        <h1>Logga in på Twitter</h1>
        <input
          type="text"
          placeholder="Mobil, e-postadress eller användarnamn"
        ></input>
      </div>

      <Link to={"/sign-up"}>Inget konto? Skapa ett här:</Link>
    </>
  );
};

export default LogIn;
