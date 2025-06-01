function PostCard({ post }) {
  const date = post.createdAt.split("T")[0];
  const time = new Date(post.createdAt).toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className="post-card">
        <h4>
          {date} {time}
        </h4>
        <p>{post.content}</p>
      </div>
    </>
  );
}

export default PostCard;
