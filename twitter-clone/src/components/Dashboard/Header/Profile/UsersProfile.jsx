import React from "react";
import { useUser } from "../../../../utils/UserContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, } from "react";
import Header from "../Header";
import Footer from "../../Footer/Footer";
import "./profile.css";
import UserPosts from "./UserPosts/UserPosts";

const UsersProfile = () => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  const [usersProfile, setUsersProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login/password");
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch(`http://localhost:3000/api/users/${id}`);
        const userData = await userRes.json();
        setUsersProfile(userData);

        //Kolla om du följer användaren
        const token = localStorage.getItem("token");
        const followingRes = await fetch(
          "http://localhost:3000/api/following",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const followingData = await followingRes.json();
        const isUserFollowed = followingData.following.some((u) => u.id === id);
        setIsFollowing(isUserFollowed);
      } catch (error) {
        console.error("Kunde inte hämta användardata", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleFollowToggle = async () => {
    const token = localStorage.getItem("token");

    const url = isFollowing
      ? "http://localhost:3000/api/unfollow"
      : "http://localhost:3000/api/follow";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetUserId: id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
      } else {
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error("Fel vid följning", error);
    }
  };

  if (loading || !usersProfile) {
    return <p>Laddar profil...</p>;
  }

  return (
    <>
      <div id="profile-container">
        <Header />
        <div id="profile-content">
          <div id="profile-card">
            <div id="profile-left" className="profile-div">
              <img
                id="profile-pic"
                src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
                alt="anonymous"
              />
              <div id="name-div">
                <h3>{usersProfile.name}</h3>
                <p>{usersProfile.nickname}</p>
              </div>
              {user._id !== id && (
                <button onClick={handleFollowToggle} className="follow-button">
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>

            <div id="profile-right" className="profile-div">
              <div className="info-row">
                <span className="profile-icon">💬</span> {usersProfile.about}
              </div>
              <div className="info-row">
                <span className="profile-icon">🏠</span> {usersProfile.hometown}
              </div>
              <div className="info-row">
                <span className="profile-icon">💼</span>{" "}
                {usersProfile.occupation}
              </div>
              <div className="info-row">
                <span className="profile-icon">📧</span> {usersProfile.email}
              </div>
              <div className="info-row">
                <span className="profile-icon">🌐</span>
                <a href="#">{usersProfile.website}</a>
              </div>
            </div>
          </div>
          <div>
            <UserPosts userId={id} />
          </div>
          <Link to="/dashboard" id="to-dashboard">
            {" "}
            &larr; Tillbaka
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UsersProfile;
