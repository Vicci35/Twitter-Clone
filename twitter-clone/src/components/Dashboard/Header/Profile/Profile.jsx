import React from "react";
import { useUser } from "../../../../utils/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../Header";
import Footer from "../../Footer/Footer";
import UserPosts from "./UserPosts.js/UserPosts";
import "./profile.css";

function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login/password");
    }
  }, [user]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div id="profile-container">
        <Header />
        <div id="profile-content">
          <div id="profile-card">
            <div id="profile-left" className="profile-div">
              {/* Fetch image from database? */}
              <img
                id="profile-pic"
                src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
                alt="anonymous"
              />
              <div id="name-div">
                <h3>{user.name}</h3>
                <p>{user.nickname}</p>
              </div>
            </div>

            <div id="profile-right" className="profile-div">
              <div className="info-row">
                <span className="profile-icon"> 💬</span> {user.about}
              </div>
              <div className="info-row">
                <span className="profile-icon">🏠 </span> {user.hometown}
              </div>
              <div className="info-row">
                <span className="profile-icon">💼 </span>
                {user.occupation}
              </div>
              <div className="info-row">
                <span className="profile-icon">📧 </span>
                {user.email}
              </div>
              <div className="info-row">
                <span className="profile-icon">🌐</span>
                <a href="#">{user.website}</a>
              </div>
            </div>
          </div>

          {/* Posts + followers */}
          <div>
            <UserPosts />
          </div>
          <Link to="/dashboard" id="to-dashboard">
            &larr; Back
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
