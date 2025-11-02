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
        <div className="nav-left-group">
          <div className="nav-back" onClick={() => navigate(-1)} aria-label="Back">
            <FaArrowLeft />
          </div>
          <div className="saras-title" aria-hidden="true">
            <span className="lotus">SARA</span><span className="softblue">S</span>
          </div>
        </div>

        <div className="nav-right">
          <span className="user-login">Login</span>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className="profile-sidebar">
        <div className="side-buttons">
          <button onClick={() => navigate("/")}>Home</button>
          <button className="side-active" onClick={() => navigate("/profile")}>Profile</button>
          <button onClick={() => navigate("/worklab")}>Work Lab</button>
          <button onClick={() => navigate("/community")}>Community</button>
          <button onClick={() => navigate("/messages")}>Messages</button>
          <button onClick={() => navigate("/bookmarks")}>Bookmarks</button>
          <button onClick={() => navigate("/settings")}>Settings</button>
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
                <div className="card-meta">Asked • 2 answers • 5 views</div>
              </article>
            )}
            {active === "answered" && (
              <article className="content-card">
                <h3 className="card-title">Answered</h3>
                <p className="card-body">AI can personalize learning experiences and help teachers identify problems early.</p>
                <div className="card-meta">Answered • 12 upvotes • 3 comments</div>
              </article>
            )}
            {active === "posts" && (
              <article className="content-card">
                <h3 className="card-title">Post</h3>
                <p className="card-body">"Technology should empower curiosity — not replace it." — short thread on AI & education.</p>
                <div className="card-meta">Posted • Jul 30</div>
              </article>
            )}
            {active === "veena" && (
              <article className="content-card">
                <h3 className="card-title">Asked Veena</h3>
                <p className="card-body">How does Veena AI handle moral/ethical ambiguity when answering user questions?</p>
                <div className="card-meta">Veena • 1 reply</div>
              </article>
            )}
            {active === "activity" && (
              <article className="content-card">
                <h3 className="card-title">Activity</h3>
                <p className="card-body">Last active: 3 hours ago • 12 answers • 3 questions</p>
              </article>
            )}
          </section>
        </main>

        {/* RIGHT PANEL */}
        <aside className="right-panel">
          <div className="info-card">
            <h3>Credentials & Highlights</h3>
            <div className="info-item"><FaBriefcase /> Add employment credential</div>
            <div className="info-item"><FaGraduationCap /> Add education credential</div>
            <div className="info-item"><FaMapMarkerAlt /> Add location credential</div>
            <div className="info-item joined"><FaCalendarAlt /> Joined May 2021</div>
          </div>

          <div className="info-card">
            <h3>Knows about</h3>
            <p className="empty-note">You haven't added any topics yet.</p>
            <button className="add-topic-btn">Add topics</button>
          </div>
        </aside>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div className="modal-backdrop" onClick={() => setShowEdit(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Edit profile</h2>
            <label>
              Name
              <input defaultValue={defaultName} />
            </label>
            <label>
              Username
              <input defaultValue="rajztiwari" />
            </label>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowEdit(false)}>Cancel</button>
              <button className="btn-save" onClick={() => setShowEdit(false)}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
