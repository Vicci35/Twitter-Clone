import React, { useState, useRef, useEffect } from "react"; // Lägg till useRef och useEffect
import { Link } from "react-router-dom";

function DashHeader() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // ← Här skapas dropdownRef

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Stäng dropdown om man klickar utanför
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function deleteToken() {
    localStorage.removeItem("token");
  }

  return (
    <div className="header">
      <div id="head-left" className="head-div">
        <h2>Twitter Clone</h2>
      </div>

      <div id="head-mid" className="head-div">
        {/* Hämta användarnamn från cookie/localStorage/Token */}
        <h1>Welcome *user*</h1>
      </div>

      <div id="head-right" className="head-div">
        {/* <button>New post</button> */}

        <div className="dropdown-container" ref={dropdownRef}>
          <button onClick={toggleDropdown}>☰</button>
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/user-settings">Settings</Link>
              <Link to="/" onClick={deleteToken}>
                Log out
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashHeader;
