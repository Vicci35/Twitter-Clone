import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  passwordMatch,
  isStrongPassword,
  includeSpaces,
} from "../../utils/validators";
import { saveNewUser } from "../../api/userService";
import "./SignUpStyle.css";

function SignUp() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [hasCapital, setHasCapital] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);

  function handleInput(e) {
    const { id, value } = e.target;
    setUser((prevInfo) => ({ ...prevInfo, [id]: value }));
  }

  useEffect(() => {
    const pw = user.password;
    setHasCapital(/[A-Z]/.test(pw));
    setHasNumber(/[0-9]/.test(pw));
    setHasSpecial(/[!@#$%^&*]/.test(pw));
  }, [user.password]);

  async function handleSubmit(e) {
    e.preventDefault();

    // Check password
    if (!passwordMatch(user.password, user.repeatPassword)) {
      setErrorMsg("Lösenorden måste matcha!");
      return;
    }

    if (!isStrongPassword(user.password)) {
      setErrorMsg("Svagt lösenord");
    }

    // Check if username or password includes white space
    if (includeSpaces(user.username) || includeSpaces(user.password)) {
      setErrorMsg("Inga mellanslag tillåts");
      return;
    }

    setErrorMsg("");

    try {
      const data = await saveNewUser(user);

      if (data.error) {
        setErrorMsg(data.error);
        return;
      }

      if (data.userSaved) {
        navigate("/");
      }
      // Reset user info after submiting form
      setUser(() => ({
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
      }));
    } catch (err) {
      console.error("Something went wrong:", err);
    }
  }

  return (
    <div id="signUpForm">
      <h1>Skapa konto</h1>

      <form onSubmit={handleSubmit} autoComplete="off">
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

        <label htmlFor="password">Lösenord:</label>
        <input
          className="signupInput"
          type="password"
          id="password"
          placeholder="Lösenord"
          onChange={handleInput}
        />

        <label htmlFor="repeatPassword">Repetera lösenord:</label>
        <input
          className="signupInput"
          type="password"
          id="repeatPassword"
          placeholder="Repetera lösenord"
          onChange={handleInput}
        />

        <div id="password-check">
          <p
            id="capital"
            style={{ color: hasCapital ? "green" : "rgba(0, 0, 0, 0.6)" }}
          >
            Minst en versal
          </p>
          <p
            id="number"
            style={{ color: hasNumber ? "green" : "rgba(0, 0, 0, 0.6)" }}
          >
            Minst en siffra
          </p>
          <p
            id="special"
            style={{ color: hasSpecial ? "green" : "rgba(0, 0, 0, 0.6)" }}
          >
            Minst ett specialtecken
          </p>
        </div>

        <p id="wrong-pass">{errorMsg}</p>

        <input type="submit" value="Spara" id="saveUser" />
      </form>

      <Link id="toStart" to={"/"}>
        Till login
      </Link>
    </div>
  );
}

export default SignUp;
