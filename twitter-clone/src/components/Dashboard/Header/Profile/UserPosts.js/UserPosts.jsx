import { useState, useEffect } from "react";
import { useUser } from "../../../../../utils/UserContext.jsx";
import { profilePosts } from "../../../../../api/posts.js";
import PostCard from "./PostCard";
import "./userpostStyle.css";

function UserPosts() {
  const { user } = useUser();
  const userId = user._id;
  const [posts, setPosts] = useState([]);

  console.log(userId);
  useEffect(() => {
    async function getPosts(userId) {
      const data = await profilePosts(userId);
      setPosts(data);
    }

    getPosts(userId);
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
          <div>
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <h3>No posts to show</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPosts;
