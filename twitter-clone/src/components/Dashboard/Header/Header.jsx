
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../../utils/UserContext";

export function deleteToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

function DashHeader({ userName }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useUser();

  const showLogoutDiv = confirmLogout ? "show-logout" : "hide-logout";

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

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

  const profileImg = user?.profileImage ? `http://localhost:3000/${user.profileImage}` : "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"

  return (
    <div className="header">
      <div id="head-left" className="head-div">
        <h2>Twitter Clone</h2>
      </div>

      <div id="head-mid" className="head-div">
        <h1>{`Welcome ${user.nickname}`}</h1>
      </div>

      <div id="head-right" className="head-div">
        <div className="dropdown-container" ref={dropdownRef}>
          <button onClick={toggleDropdown}>☰</button>
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/profile">Profile</Link>
              <Link to="/user-settings">Settings</Link>
              <a onClick={() => setConfirmLogout((prevVal) => !prevVal)}>
                Logout
              </a>
            </div>
          )}
        </div>
      </div>

      <div className={showLogoutDiv} data-testid="logout-confirmation">
        <h3>Do you want to log out?</h3>
        <div id="confirm">
          <Link to="/" onClick={deleteToken} id="confirm-logout">
            Log out
          </Link>
          <a
            id="cancel-logout"
            onClick={() => setConfirmLogout((prevVal) => !prevVal)}
          >
            Cancel
          </a>
        </div>
      </div>
    </div>

  );
}

export default DashHeader;
