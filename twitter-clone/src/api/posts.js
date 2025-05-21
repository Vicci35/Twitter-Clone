async function fetchAllPosts() {
  const res = await fetch("http://localhost:3000/api/posts/feed");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

async function createPost({ content, author }) {
  const res = await fetch("http://localhost:3000/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, author }),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }
  return res.json();
}

async function profilePosts(id) {
  const res = await fetch(`http://localhost:3000/api/posts/user/${id}`);

  const data = await res.json();
  return data;
}

export { fetchAllPosts, createPost, profilePosts };
