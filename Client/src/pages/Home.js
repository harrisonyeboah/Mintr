import React, { useEffect, useState } from "react";

const Home = ({ searchQuery }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  // Filter posts by search query
  const filteredPosts = posts.filter((post) =>
    post.author.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>All Posts</h2>
      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        filteredPosts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p>Requested: ${post.amountRequested}</p>
            <p>By: {post.author.username}</p>
            <p>{post.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
