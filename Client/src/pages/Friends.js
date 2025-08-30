import React, { useEffect, useState } from "react";

const Friends = ({ searchQuery }) => {
  const [friendsPosts, setFriendsPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts/friends") // create this backend route to get friends posts
      .then((res) => res.json())
      .then((data) => setFriendsPosts(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredPosts = friendsPosts.filter((post) =>
    post.author.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Friends’ Posts</h2>
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

export default Friends;
