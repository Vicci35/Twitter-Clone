import React, { useState } from "react";
import "./Home.css"; // Importera CSS-filen

const mockTweets = [
  { id: 1, user: "Alice", content: "Loving the weather! #sunshine" },
  { id: 2, user: "Bob", content: "Crypto is wild right now. #Crypto" },
];

const trendingHashtags = ["#Crypto", "#China", "#React", "#OpenAI", "#Travel"];

export default function HomeFeed() {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState(mockTweets);

  const handleTweet = () => {
    if (tweet.length === 0 || tweet.length > 140) return;
    const newTweet = {
      id: Date.now(),
      user: "Du", // Placeholder
      content: tweet,
    };
    setTweets([newTweet, ...tweets]);
    setTweet("");
  };

  return (
    <div className="app-container">
      <div className="main-feed">
        <div className="tweet-box">
          <textarea
            placeholder="What's happening?"
            maxLength={140}
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />
          <div className="tweet-box-footer">
            <span>{140 - tweet.length} tecken kvar</span>
            <button onClick={handleTweet}>Tweet</button>
          </div>
        </div>

        <div className="tweets-list">
          {tweets.map((t) => (
            <div key={t.id} className="tweet">
              <strong>{t.user}</strong>: {t.content}
            </div>
          ))}
        </div>
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
            <li key={index} className="hashtag">{tag}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}