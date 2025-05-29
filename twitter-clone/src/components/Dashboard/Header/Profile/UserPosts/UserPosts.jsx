import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../../../../utils/UserContext.jsx";
import { profilePosts } from "../../../../../api/posts.js";
import PostCard from "./PostCard.jsx";
import "./userpostStyle.css";

function UserPosts({ userId: propUserId }) {
  const { user } = useUser();
  const [loading, setloading] = useState(true);
  const [posts, setPosts] = useState([]);

  const userId = propUserId || (user && user._id);

  console.log(userId);

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

  return (
    <>
      <div id="activity-div">
        <div id="followers">
          <h2>Followers</h2>
          <h3>No followers to show</h3>
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
