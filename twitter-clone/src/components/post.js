import React from "react";

const Post = ({ post }) => (
  <div>
    <p data-testid="post-content">{post.content}</p>
    <p data-testid="post-author">@{post.author}</p>
    <p data-testid="post-date">{new Date(post.createdAt).toLocaleString()}</p>
  </div>
);

export default Post;