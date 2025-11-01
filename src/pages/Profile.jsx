import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaChartLine, FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [active, setActive] = useState("asked");
  const [showEdit, setShowEdit] = useState(false);

  const defaultName = "Raj Tiwari";

  return (
    <div className="saras-page profile-page">
      {/* NAVBAR */}
      <header className="saras-navbar">
        <div className="nav-left" onClick={() => navigate(-1)} aria-label="Back">
          <FaArrowLeft />
        </div>

        <div className="saras-title" aria-hidden="true">
          <span className="lotus">SARA</span><span className="softblue">S</span>
        </div>

        <div className="nav-center">
          <input className="nav-search" type="search" placeholder="Search questions..." />
        </div>

        <div className="nav-right">
          <button className="login-pill">Login</button>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className="profile-sidebar">
        <div className="side-buttons">
          <button className="side-btn" onClick={() => navigate("/")}>Home</button>
          <button className="side-btn side-active" onClick={() => navigate("/profile")}>Profile</button>
          <button className="side-btn">Work Lab</button>
          <button className="side-btn">Community</button>
          <button className="side-btn">Messages</button>
          <button className="side-btn">Bookmarks</button>
          <button className="side-btn">Settings</button>
        </div>
      </aside>

      {/* MAIN + RIGHT SECTION WRAPPER */}
      <div className="profile-container">
        {/* MAIN */}
        <main className="profile-main">
          <div className="profile-banner" />

          <section className="profile-top">
            <div className="avatar-block">
              <div className="avatar">{defaultName.charAt(0)}</div>
            </div>

            <div className="profile-meta">
              <div className="name-row">
                <h1 className="profile-name">{defaultName}</h1>
                <span className="profile-handle">@rajztiwari</span>
              </div>

              <div className="stats-row">
                <div className="follow-stats">
                  <span><strong>694</strong> Following</span>
                  <span><strong>159</strong> Followers</span>
                </div>

                <div className="impressions">
                  <FaChartLine className="impr-icon" />
                  <div className="impr-text">
                    <div className="impr-number">12.3K</div>
                    <div className="impr-label">Impressions</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="edit-btn" onClick={() => setShowEdit(true)}>Edit profile</button>
            </div>
          </section>

          {/* Tabs */}
          <nav className="profile-tabs">
            {["asked", "answered", "posts", "veena", "activity"].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${active === tab ? "active" : ""}`}
                onClick={() => setActive(tab)}
              >
                {tab === "asked"
                  ? "Asked"
                  : tab === "answered"
                  ? "Answered"
                  : tab === "posts"
                  ? "Posts"
                  : tab === "veena"
                  ? "Asked Veena"
                  : "Activity"}
              </button>
            ))}
          </nav>

          {/* Content */}
          <section className="profile-content">
            {active === "asked" && (
              <article className="content-card">
                <h3 className="card-title">Asked Question</h3>
                <p className="card-body">What are the long-term effects of machine learning on education systems?</p>
                <div className="card-meta">Asked • 2 answer

