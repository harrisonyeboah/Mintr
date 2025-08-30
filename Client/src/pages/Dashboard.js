import React, { useState } from "react";
import '../styles/Dashboard.css';
const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Sidebar component
  const Sidebar = () => (
    <aside>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <nav>
        <button onClick={() => setCurrentPage("Home")}>Home</button>
        <button onClick={() => setCurrentPage("Friends")}>Friends</button>
        <button onClick={() => setCurrentPage("YourPosts")}>Your Posts</button>
      </nav>
    </aside>
  );

  // Home component
  const Home = ({ searchQuery }) => (
    <div>
      <h2>Home</h2>
      <p>Search query: "{searchQuery}"</p>
    </div>
  );

  // Friends component
  const Friends = ({ searchQuery }) => (
    <div>
      <h2>Friends</h2>
      <p>Search query: "{searchQuery}"</p>
    </div>
  );

  // YourPosts component
  const YourPosts = ({ searchQuery }) => {
    const posts = [
      { id: 1, title: "Post 1", content: "This is my first post." },
      { id: 2, title: "Post 2", content: "Another post here." },
      { id: 3, title: "Post 3", content: "React is fun!" },
    ];

    const filteredPosts = posts.filter(
      post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div>
        <h2>Your Posts</h2>
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No posts match your search query: "{searchQuery}"</p>
        )}
      </div>
    );
  };

  // Main content rendering
  const MainContent = () => {
    switch (currentPage) {
      case "Home":
        return <Home searchQuery={searchQuery} />;
      case "Friends":
        return <Friends searchQuery={searchQuery} />;
      case "YourPosts":
        return <YourPosts searchQuery={searchQuery} />;
      default:
        return <Home searchQuery={searchQuery} />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ marginLeft: "20px", flex: 1 }}>
        <MainContent />
      </main>
    </div>
  );
};

export default Dashboard;
