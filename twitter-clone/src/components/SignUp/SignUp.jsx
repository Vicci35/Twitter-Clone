import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validatePhone, passwordMatch } from "../../utils/validators";
import { saveNewUser } from "../../api/userService";
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

  function handleInput(e) {
    const { id, value } = e.target;
    setUser((prevInfo) => ({ ...prevInfo, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Check phone number and passwords
    if (!validatePhone(user.phone)) {
      console.log("Ogiltigt telefonnummer");
      return;
    }

    if (!passwordMatch(user.password, user.repeatPassword)) {
      console.log("Lösenorden måste matcha!");
      return;
    }

    console.log(user);
    saveNewUser(user);
  }

  return (
    <div id="signUpForm">
      <h1>Skapa konto</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Namn: </label>
        <input
          className="signupInput"
          type="text"
          id="name"
          placeholder="Namn"
          onChange={handleInput}
        />

        <label htmlFor="username">Användarnamn:</label>
        <input
          className="signupInput"
          type="text"
          id="username"
          placeholder="Användarnamn"
          onChange={handleInput}
        />

        <label htmlFor="email">E-post:</label>
        <input
          className="signupInput"
          type="email"
          id="email"
          placeholder="bananpaj@zupahmail.com"
          onChange={handleInput}
        />

        <label htmlFor="phone">Telefon:</label>
        <input
          className="signupInput"
          type="phone"
          id="phone"
          placeholder="123 456 78 90"
          onChange={handleInput}
        />

        <label htmlFor="password">Lösenord:</label>
        <input
          className="signupInput"
          type="password"
          id="password"
          placeholder="Lösenord"
          onChange={handleInput}
        />

        <label htmlFor="repeatPassword">Lösenord:</label>
        <input
          className="signupInput"
          type="password"
          id="repeatPassword"
          placeholder="Repetera lösenord"
          onChange={handleInput}
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
