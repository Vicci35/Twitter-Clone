import React, { useState, useEffect } from "react";
import "./Home.css";
import { useUser } from "../../utils/UserContext";
import { searchPosts } from "../../controllers/searchController.js";
import { fetchAllPosts, createPost } from "../../api/posts";

const trendingHashtags = ["#Crypto", "#China", "#React", "#OpenAI", "#Travel"];

export default function HomeFeed() {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchWord, setSearchWord] = useState("");

  // useEffect(() => {
  //   const loadPosts = async () => {
  //     try {
  //       const data = await fetchAllPosts();
  //       setPosts(data);
  //     } catch (err) {
  //       console.error("Failed to load posts", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (user) loadPosts();
  // }, [user]);

  useEffect(() => {
    async function getSearch(searchTerm) {
      try {
        const response = await searchPosts(searchTerm);
        console.log(response);
        setPosts(response);
      } catch (err) {
        console.error("Failed to load posts", err);
      } finally {
        setLoading(false);
      }
    }

    getSearch(searchWord);
  }, [searchWord]);

  const handleTweet = async () => {
    if (!content.trim() || content.length > 140) return;

    try {
      const newPost = await createPost({
        content,
        author: user._id,
      });

      setPosts([newPost, ...posts]);
      setContent("");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not post. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <div className="main-feed">
        <h1 className="header">Home</h1>

        {user && (
          <div className="tweet-box">
            <textarea
              placeholder="What's happening?"
              maxLength={140}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="tweet-box-footer">
              <span>{140 - content.length} tecken kvar</span>
              <button id="post-button" onClick={handleTweet}>
                Tweet
              </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        )}

        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet. Be the first!</p>
        ) : (
          <div className="tweets-list">
            {posts.map((post) => (
              <div key={post._id} className="tweet">
                <strong>{post.author?.nickname || "Unknown"}</strong>:{" "}
                {post.content}
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
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
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
