import React, { useState, useEffect } from "react";
import "./Home.css"; // Importera CSS-filen
import PostForm from "../Dashboard/PostForm";
import { useUser } from "../../utils/UserContext"
import { fetchAllPosts } from "../../api/posts";

const trendingHashtags = ["#Crypto", "#China", "#React", "#OpenAI", "#Travel"];

export default function HomeFeed() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
      } catch (err) {
        console.error("Failed to load posts", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) loadPosts();
  }, [user]);

  return (
    <div className="app-container">
      <div className="main-feed">
        <h1 className="header">Home</h1>

        {user && (
          <PostForm
            userId={user._id}
            onPostCreated={(newPost) => setPosts([newPost, ...posts])}
          />
        )}

        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet. Be the first!</p>
        ) : (
          <div className="tweets-list">
            {posts.map((post) => (
              <div key={post._id} className="tweet">
                <strong>{post.author.nickname}</strong>: {post.content}
                <div className="timestamp">
                  {new Date(post.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <aside className="sidebar">
        <input
          type="text"
          placeholder="Sök hashtags eller personer"
          className="search-input"
        />
        <h3>Trendar bland de du följer</h3>
        <ul className="trending-list">
          {trendingHashtags.map((tag, index) => (
            <li key={index} className="hashtag">
              {tag}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
