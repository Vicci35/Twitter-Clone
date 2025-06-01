import { useUser } from "../../../../utils/UserContext";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../../Footer/Footer";
import UserPosts from "../Profile/UserPosts/UserPosts";
import "./profile.css";

function Profile() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login/password");
      return;
    }

    const fetchProfile = async () => {
      try{
        const res = await fetch(`http://localhost:3000/api/users/${user._id}`);
        if (res.ok) {
          const data = await res.json();
          setProfileData(data);
          setUser(data);
        } else {
          console.error("Could not fetch profile");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate, setUser]);

  if (loading) return <p>Loading profile...</p>;
  if (!profileData) return <p>Profile not found</p>;

   const imageUrl = profileData.profileImage
    ? `http://localhost:3000/${profileData.profileImage}`
    : "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg";


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
                src={imageUrl}
                alt="Profile"
              />
              <div id="name-div">
                <h3>{profileData.name}</h3>
                <p>{profileData.nickname}</p>
              </div>
            </div>

            <div id="profile-right" className="profile-div">
              <div className="info-row">
                <span className="profile-icon"> 💬</span> {profileData.about}
              </div>
              <div className="info-row">
                <span className="profile-icon">🏠 </span> {profileData.hometown}
              </div>
              <div className="info-row">
                <span className="profile-icon">💼 </span>
                {profileData.occupation}
              </div>
              <div className="info-row">
                <span className="profile-icon">📧 </span>
                {profileData.email}
              </div>
              <div className="info-row">
                <span className="profile-icon">🌐</span>
                <a href="#">{profileData.website}</a>
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
