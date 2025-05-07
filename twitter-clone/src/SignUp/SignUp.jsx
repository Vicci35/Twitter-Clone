import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpStyle.css";

function SignUp() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
  });

  return (
    <div id="signUpForm">
      <h1>Skapa konto</h1>

      <form action="">
        <label htmlFor="name">Namn: </label>
        <input
          className="signupInput"
          type="text"
          id="name"
          placeholder="Namn"
        />

        <label htmlFor="username">Användarnamn:</label>
        <input
          className="signupInput"
          type="text"
          id="username"
          placeholder="Användarnamn"
        />

        <label htmlFor="email">E-post</label>
        <input
          className="signupInput"
          type="email"
          id="email"
          placeholder="bananpaj@zupahmail.com"
        />

        <label htmlFor="phone">Telefon:</label>
        <input
          className="signupInput"
          type="phone"
          id="phone"
          placeholder="123 456 78 90"
        />

        <label htmlFor="password">Lösenord</label>
        <input
          className="signupInput"
          type="password"
          id="password"
          placeholder="Lösenord"
        />

        <label htmlFor="repeatPassword">Lösenord</label>
        <input
          className="signupInput"
          type="password"
          id="repeatPassword"
          placeholder="Repetera lösenord"
        />

        <input type="submit" value="Spara" id="saveUser" />
      </form>

      <Link id="toStart" to={"/"}>
        Till login
      </Link>
    </div>
  );
}

export default SignUp;
