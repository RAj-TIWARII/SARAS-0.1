import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaPlus, FaHeart, FaComment, FaShare, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Community.css";

export default function Community() {
  const navigate = useNavigate();

  const [discussions, setDiscussions] = useState(() => {
    const saved = localStorage.getItem("sarasDiscussions");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            user: "Ananya Rao",
            username: "@ananya_rao",
            title:
              "How can ISRO’s future missions benefit from AI-based navigation systems?",
            description:
              "Exploring how deep learning can optimize real-time path correction and fault detection for lunar and interplanetary missions.",
            tags: ["AI", "SpaceTech", "ISRO"],
            likes: 34,
            comments: 4,
          },
          {
            id: 2,
            user: "Kiran Patel",
            username: "@kiran_p",
            title: "Suggestions for low-cost telemetry systems for student rockets?",
            description:
              "Looking for budget-friendly solutions for data acquisition and live tracking in micro rocket prototypes under ₹2000.",
            tags: ["Arduino", "Aerospace", "Electronics"],
            likes: 21,
            comments: 3,
          },
        ];
  });

  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", description: "", tags: "" });

  useEffect(() => {
    localStorage.setItem("sarasDiscussions", JSON.stringify(discussions));
  }, [discussions]);

  return (
    <div className="saras-page community-page">
      {/* Navbar */}
      <header className="saras-navbar">
        <div className="nav-left" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </div>

        <div className="saras-title">
          <span className="lotus">SARA</span>
          <span className="softblue">S</span>
        </div>

        <div className="nav-center">
          <input className="nav-search" type="search" placeholder="Search discussions..." />
        </div>

        <div className="nav-right">
          <button className="login-pill">Login</button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="profile-sidebar">
        <div className="side-buttons">
          <button className="side-btn" onClick={() => navigate("/")}>Home</button>
          <button className="side-btn" onClick={() => navigate("/profile")}>Profile</button>
          <button className="side-btn" onClick={() => navigate("/worklab")}>Work Lab</button>
          <button className="side-btn side-active" onClick={() => navigate("/community")}>Community</button>
          <button className="side-btn" onClick={() => navigate("/messages")}>Messages</button>
          <button className="side-btn" onClick={() => navigate("/bookmarks")}>Bookmarks</button>
          <button className="side-btn" onClick={() => navigate("/settings")}>Settings</button>
        </div>
      </aside>

      {/* Main Section */}
      <main className="community-main">
        <h1 className="community-title">Community</h1>
        <p className="community-subtitle">
          Share your questions, insights, and discoveries with others in the SARAS network.
        </p>

        <button className="add-discussion-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Start a Discussion
        </button>

        <div className="discussion-feed">
          {discussions.map((post) => (
            <div className="discussion-card" key={post.id}>
              <div className="user-info">
                <div>
                  <h4>{post.user}</h4>
                  <p>{post.username}</p>
                </div>
                <button className="join-btn">
                  <FaUserPlus /> Join
                </button>
              </div>

              <div className="discussion-content">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>

              <div className="discussion-tags">
                {post.tags.map((t, i) => (
                  <span className="tag" key={i}>{t}</span>
                ))}
              </div>

              <div className="discussion-actions">
                <button
                  className="action-btn"
                  onClick={() =>
                    setDiscussions((prev) =>
                      prev.map((p) =>
                        p.id === post.id ? { ...p, likes: p.likes + 1 } : p
                      )
                    )
                  }
                >
                  <FaHeart /> {post.likes}
                </button>
                <button className="action-btn"><FaComment /> {post.comments}</button>
                <button className="action-btn"><FaShare /></button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Right Panel */}
      <aside className="right-panel">
        <div className="info-card">
          <h3>Trending Topics</h3>
          <ul className="trend-list">
            <li>#ISRO</li>
            <li>#AI</li>
            <li>#Arduino</li>
            <li>#SpaceTech</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>Top Contributors</h3>
          <ul className="trend-list">
            <li>Raj Tiwari</li>
            <li>Ananya Rao</li>
            <li>Kiran Patel</li>
            <li>Neha Verma</li>
          </ul>
        </div>
      </aside>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Start a Discussion</h2>
            <input
              type="text"
              placeholder="Discussion Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <textarea
              placeholder="Write your thoughts..."
              value={newPost.description}
              onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={newPost.tags}
              onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
            />
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className="btn-save"
                onClick={() => {
                  if (!newPost.title || !newPost.description) return alert("Please fill all fields!");
                  const tagArray = newPost.tags.split(",").map((t) => t.trim());
                  const updated = [
                    ...discussions,
                    {
                      id: Date.now(),
                      user: "Raj Tiwari",
                      username: "@rajztiwari",
                      title: newPost.title,
                      description: newPost.description,
                      tags: tagArray,
                      likes: 0,
                      comments: 0,
                    },
                  ];
                  setDiscussions(updated);
                  setShowModal(false);
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
