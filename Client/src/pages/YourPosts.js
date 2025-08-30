import React, { useEffect, useState } from "react";

const YourPosts = ({ searchQuery }) => {
  const [yourPosts, setYourPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts/your") // backend route to get logged-in user posts
      .then((res) => res.json())
      .then((data) => setYourPosts(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredPosts = yourPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Your Posts</h2>
      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        filteredPosts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p>Requested: ${post.amountRequested}</p>
            <p>{post.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default YourPosts;
