import { useState } from "react";
import { createPost } from "../../api/posts";

function PostForm({ userId, onPostCreated }) {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!content.trim()) {
            return setError("Post content can't be empty");
        }

        try {
            const newPost = await createPost({ content, author: userId });
            setContent("");
            if (onPostCreated) {
                onPostCreated(newPost);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to post. Try again.");
        }
    };

  return (
    <form onSubmit={handleSubmit}>
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            maxLength={140}
            rows={3}
            style={{ width: "100%", marginBottom: "8px" }}
        />
        <button type="submit">Post</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
);
}

export default PostForm;