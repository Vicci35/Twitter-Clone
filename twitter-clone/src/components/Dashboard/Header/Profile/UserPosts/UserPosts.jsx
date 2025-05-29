import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../../../../utils/UserContext.jsx";
import { profilePosts } from "../../../../../api/posts.js";
import PostCard from "./PostCard.jsx";
import "./userpostStyle.css";

function UserPosts({ userId: propUserId }) {
  const { user } = useUser();
  const [loading, setloading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [posts, setPosts] = useState([]);

  const userId = propUserId || (user && user._id);

  console.log("From UserPosts:", userId);

  useEffect(() => {
    if (!userId) return;

    const getPosts = async () => {
      try {
        setloading(true);
        const data = await profilePosts(userId);
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setloading(false);
      }
    };

    getPosts();
  }, [userId]);

  useEffect(() => {
    async function getFollowers(id) {
      const token = localStorage.getItem("token");

      const resp = await fetch(`http://localhost:3000/api/followers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await resp.json();

      setFollowers(data.followers);
      console.log(followers);
    }

    getFollowers(userId);
  }, [userId]);

  useEffect(() => {
    console.log("Followers:", followers);
  }, [followers]);

  return (
    <>
      <div id="activity-div">
        <div id="followers">
          <h2>Followers</h2>
          {followers.length > 0 ? (
            followers.map((follower) => (
              <Link
                key={follower.id}
                to={`/users/${follower.id}`}
                className="follower-link"
              >
                {follower.nickname}
              </Link>
            ))
          ) : (
            <h3>No followers to show</h3>
          )}
        </div>

        <div id="user-posts">
          <h2>Posts</h2>
          {loading ? (
            <p>Loading posts...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <h3>No posts to show</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default UserPosts;
