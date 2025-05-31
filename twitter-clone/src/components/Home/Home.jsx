import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import "./Home.css";
import { useUser } from "../../utils/UserContext";
import { searchPosts } from "../../controllers/searchController.js";
import { fetchAllPosts, createPost, createComment } from "../../api/posts";
import ProfilePic from "../Dashboard/Header/Profile/ProfileImg/ProfileImg.jsx";

const trendingHashtags = ["#Crypto", "#China", "#React", "#OpenAI", "#Travel"];
const socket = io("http://localhost:3000");

export default function HomeFeed() {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [followersOnly, setFollowersOnly] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedAuthorId, setSelectedAuthorId] = useState("");

  //comments
  const [commentInputs, setCommentInputs] = useState({});

  // Paginering
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 20;

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postPerPage);

  useEffect(() => {
    socket.on("tweetFromOtherUser", (newTweet) => {
      setPosts((prevPosts) => [newTweet, ...prevPosts]);
    });

    return () => {
      socket.off("tweetFromOtherUser");
    };
  }, []);

  // ⚠️ This logic is finalized and working as intended
  useEffect(() => {
    async function getSearch(searchTerm) {
      try {
        if (followersOnly) {
          const token = localStorage.getItem("token");

          const resp = await fetch(
            `http://localhost:3000/api/posts/feed/following/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await resp.json();
          console.log(data);
          setPosts(data);
        } else {
          const response = await searchPosts(searchTerm);
          setPosts(response);
        }
      } catch (err) {
        console.error("Failed to load followed feed", err);
      } finally {
        setLoading(false);
      }
    }

    getSearch(searchWord);
  }, [searchWord, followersOnly]);

  const handleTweet = async () => {
    if (!content.trim() || content.length > 140) return;

    try {
      const newPost = await createPost({
        content,
        author: user._id,
      });

      setPosts([newPost, ...posts]);
      socket.emit("newTweet", newPost);
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
                    <ProfilePic
                      id="profile-pic-small"
                      imageUrl={post.author?.profileImage}
                    />
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
                {/* Comment form */}
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const comment = commentInputs[post._id];
                    if (!comment || !comment.trim()) return;

                    try {
                      const updatedPost = await createComment(post._id, comment, user._id);
                      setPosts((prev) =>
                        prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
                      );
                      setCommentInputs((prev) => ({ ...prev, [post._id]: "" }));
                    } catch (err) {
                      console.error("Failed to post comment", err);
                    }
                  }}
                  style={{ marginTop: "8px" }}
                >

                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentInputs[post._id] || ""}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({ ...prev, [post._id]: e.target.value }))
                    }
                    style={{ width: "70%", marginRight: "8px" }}
                  />
                  <button type="submit">Comment</button>
                </form>
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

      <div className="aside-div">
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

        <div>
          <input
            type="checkbox"
            id="followers-only"
            checked={followersOnly}
            onChange={() => setFollowersOnly((prevVal) => !prevVal)}
          />
          <label htmlFor="followers-only">Show following only</label>
        </div>
      </div>
    </div>
  );
}
