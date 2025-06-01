import { useState, useEffect } from "react";
import { getProfileInfo } from "../../../api/userService.js";
import { profilePosts } from "../../../api/posts.js";
import "./UserProfileStyle.css";

function UserProfile({ className, onClose, author, authorId }) {
  const [id, setId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    setId(authorId);
  }, [authorId]);

  useEffect(() => {
    if (!authorId) {
      return;
    }

    async function fetchUserData(id) {
      const data = await getProfileInfo(authorId);
      setUserData(data);
    }

    fetchUserData(id);
  }, [authorId]);

  useEffect(() => {
    async function getUserPosts(id) {
      if (!author) return;

      const allPosts = await profilePosts(id);

      console.log("from server:", allPosts);
      setUserPosts(allPosts);
    }

    getUserPosts(authorId);
  }, [authorId]);

  if (!userData) {
    return (
      <div className={className}>
        <p>Laddar profil...</p>
        <button onClick={onClose}>Stäng</button>
      </div>
    );
  }

  return (
    <>
      <div className={className}>
        <div id="user-main-container">
          <h2>{userData.name}</h2>
          <div id="top-info-main">
            <div id="top-info-left" className="top-info">
              <img
                src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
                alt="profile pic"
                id="profile-pic-mini"
              />
              <h4>{userData.nickname}</h4>
            </div>

            <div id="top-info-right" className="top-info">
              <p> 🏠 {userData.hometown}</p>
              <p> 💼 {userData.occupation}</p>
              <p> 💬 {userData.about}</p>
            </div>
          </div>

          {/* Followers and posts */}
          <div id="user-activity">
            <div id="activity-left">
              <h4>Followers</h4>
              {userData.followers.length > 0 ? (
                <ul>
                  {userData.followers.map((follower, index) => (
                    <li key={index}>{follower}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  <i> No followers yet</i>
                </p>
              )}
            </div>

            <div id="activity-right">
              <h4>Posts</h4>
              {userPosts.map((post, id) => (
                <div key={id} className="post-card-mini">
                  <h5>{post.createdAt.split("T")[0]}</h5>
                  {post.content}
                </div>
              ))}
            </div>
          </div>

          {/* Follow/Unfollow button */}
          <button id="follow-button">+ Follow {userData.nickname}</button>
        </div>

        <button onClick={onClose} id="close-btn">
          Close
        </button>
      </div>
    </>
  );
}

export default UserProfile;
