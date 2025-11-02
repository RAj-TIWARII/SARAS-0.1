import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaTrashAlt,
  FaExternalLinkAlt,
  FaBookmark,
} from "react-icons/fa";
import "./Bookmarks.css";

export default function Bookmarks() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("sarasBookmarks");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "How can ISRO’s future missions benefit from AI-based navigation systems?",
            desc: "Exploring how deep learning can improve real-time path correction and fault detection for lunar missions.",
            type: "discussion",
            link: "https://voltvoyage.in",
          },
          {
            id: 2,
            title: "Gesture-Controlled Smart Wheelchair",
            desc: "A system that interprets finger movements to control a wheelchair for physically disabled users.",
            type: "project",
            link: "https://voltvoyage.in",
          },
          {
            id: 3,
            title: "What are the main applications of AI in the medical field?",
            desc: "AI assists in diagnostics, patient monitoring, drug discovery, and healthcare data analysis.",
            type: "question",
            link: "https://voltvoyage.in",
          },
        ];
  });

  // Save state
  useEffect(() => {
    localStorage.setItem("sarasBookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Remove bookmark
  const removeBookmark = (id) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
  };

  // Filter + Search logic
  const filtered = bookmarks.filter(
    (b) =>
      (filter === "all" || b.type === filter) &&
      b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="saras-page bookmarks-page">
      {/* NAVBAR */}
      <header className="saras-navbar">
        <div className="nav-left" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </div>
        <div className="saras-title">
          <span className="lotus">SARA</span>
          <span className="softblue">S</span>
        </div>
        <div className="nav-center">
          <input
            className="nav-search"
            type="search"
            placeholder="Search bookmarks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="nav-right">
          <button className="login-pill">Login</button>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className="profile-sidebar">
        <div className="side-buttons">
          <button className="side-btn" onClick={() => navigate("/")}>Home</button>
          <button className="side-btn" onClick={() => navigate("/profile")}>Profile</button>
          <button className="side-btn" onClick={() => navigate("/worklab")}>Work Lab</button>
          <button className="side-btn" onClick={() => navigate("/community")}>Community</button>
          <button className="side-btn" onClick={() => navigate("/messages")}>Messages</button>
          <button className="side-btn side-active" onClick={() => navigate("/bookmarks")}>Bookmarks</button>
          <button className="side-btn" onClick={() => navigate("/settings")}>Settings</button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="bookmarks-container">
        <div className="bookmark-header">
          <h2><FaBookmark /> Bookmarks</h2>
          <p>
            You’ve saved <strong>{bookmarks.length}</strong>{" "}
            {bookmarks.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          {["all", "question", "project", "discussion"].map((tab) => (
            <button
              key={tab}
              className={`filter-btn ${filter === tab ? "active" : ""}`}
              onClick={() => setFilter(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Bookmarks Grid */}
        <div className="bookmark-list">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div key={item.id} className="bookmark-card">
                <div className="bookmark-header-card">
                  <span className={`tag ${item.type}`}>{item.type}</span>
                  <h3>{item.title}</h3>
                </div>
                <p className="bookmark-desc">{item.desc}</p>
                <div className="bookmark-actions">
                  <button
                    className="view-btn"
                    onClick={() => window.open(item.link, "_blank")}
                  >
                    <FaExternalLinkAlt /> View Original
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeBookmark(item.id)}
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-bookmarks">
              <img
                src="https://cdn-icons-png.flaticon.com/512/864/864685.png"
                alt="empty"
                className="empty-img"
              />
              <p>“Your curiosity hasn’t saved anything yet.”</p>
              <small>Start exploring and bookmark what inspires you.</small>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
