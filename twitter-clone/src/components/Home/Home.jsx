import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useUser } from "../../utils/UserContext";
import { searchPosts } from "../../controllers/searchController.js";
import { fetchAllPosts, createPost } from "../../api/posts";
import ProfilePic from "../Dashboard/Header/Profile/ProfileImg/ProfileImg.jsx";

const trendingHashtags = ["#Crypto", "#China", "#React", "#OpenAI", "#Travel"];

export default function HomeFeed() {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedAuthorId, setSelectedAuthorId] = useState("");

  // Paginering
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 20;

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postPerPage);

  useEffect(() => {
    async function fetchFollowedFeed() {
      try {
        const data = await fetchAllPosts(user._id);
        setPosts(data);
      } catch (err) {
        console.error("Failed to load followed feed", err);
      } finally {
        setLoading(false);
      }
    }

    if (user?._id && !searchWord) {
      fetchFollowedFeed();
    }
  }, [user, searchWord]);

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

  const toggleDisplayProfile = (author, authorId) => {
    setSelectedAuthor(author);
    setSelectedAuthorId(authorId);
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
            {currentPosts.map((post, index) => (
              <div key={post._id} className="tweet">
                <div className="author-div">
                  <span className="post-number">
                    #{posts.length - (indexOfFirstPost + index)}
                  </span>{" "}
                  <Link
                    to={`/users/${post.author._id}`}
                    className="profile-link"
                  >
                    <ProfilePic id="profile-pic-small" />
                    <strong className="to-profile">
                      {post.author?.nickname || "Unknown"}
                    </strong>
                  </Link>
                  :
                </div>
                <div>{post.content}</div>
                <div className="timestamp">
                  {new Date(post.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Föregående
          </button>
          <span>
            Sida {currentPage} av {totalPages === 0 ? 1 : totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Nästa
          </button>
        </div>
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
