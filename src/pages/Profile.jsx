import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaChartLine } from "react-icons/fa";
import "./Profile.css";

const TabButton = ({ id, active, setActive, children }) => (
  <button
    className={`pv-tab ${active === id ? "pv-tab-active" : ""}`}
    onClick={() => setActive(id)}
    aria-pressed={active === id}
    type="button"
  >
    <span className="pv-tab-inner">{children}</span>
    <span className="wipe"></span>
  </button>
);

export default function Profile() {
  const navigate = useNavigate();
  const [active, setActive] = useState("asked"); // asked, answered, posts, veena, activity
  const [showEdit, setShowEdit] = useState(false);
  const defaultName = "Raj Tiwari";

  return (
    <div className="saras-page profile-root">
      {/* Navbar */}
      <header className="saras-navbar" role="banner">
        <div className="nav-left" onClick={() => navigate(-1)} title="Back" role="button">
          <FaArrowLeft className="back-icon" />
        </div>

        <div className="saras-title" aria-hidden="true">
          <span className="lotus">SARA</span><span className="softblue">S</span>
        </div>

        <div className="nav-center">
          <input className="nav-search" type="search" placeholder="Search questions..." aria-label="Search" />
        </div>

        <div className="nav-right"><button className="login-pill">Login</button></div>
      </header>

      {/* Sidebar */}
      <aside className="profile-sidebar" aria-label="Main navigation">
        <div className="side-buttons">
          <button className="side-btn" onClick={() => navigate("/")}>Home<span className="wipe"></span></button>
          <button className="side-btn active-side" onClick={() => navigate("/profile")}>Profile<span className="wipe"></span></button>
          <button className="side-btn">Work Lab<span className="wipe"></span></button>
          <button className="side-btn">Community<span className="wipe"></span></button>
          <button className="side-btn">Messages<span className="wipe"></span></button>
          <button className="side-btn">Bookmarks<span className="wipe"></span></button>
          <button className="side-btn">Settings<span className="wipe"></span></button>
        </div>
      </aside>

      {/* Main */}
      <main className="saras-main" role="main">
        <div className="profile-banner" />

        <section className="profile-top" aria-label="Profile header">
          <div className="avatar-block">
            <div className="avatar-circle" aria-hidden="true">R</div>
          </div>

          <div className="profile-meta">
            <div className="name-row">
              <h1 className="profile-name" title={defaultName}>{defaultName}</h1>
              <span className="profile-handle">@rajztiwari</span>
            </div>

            <div className="profile-stats-wrap">
              <div className="profile-stats">
                <span><strong>694</strong> Following</span>
                <span><strong>159</strong> Followers</span>
              </div>

              <div className="impressions" title="Profile impressions">
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

        <nav className="profile-tabs" aria-label="Profile sections">
          <TabButton id="asked" active={active} setActive={setActive}>Asked</TabButton>
          <TabButton id="answered" active={active} setActive={setActive}>Answered</TabButton>
          <TabButton id="posts" active={active} setActive={setActive}>Posts</TabButton>
          <TabButton id="veena" active={active} setActive={setActive}>Asked Veena</TabButton>
          <TabButton id="activity" active={active} setActive={setActive}>Activity</TabButton>
        </nav>

        <section className="profile-content-area" aria-live="polite">
          {active === "asked" && (
            <article className="card example-card">
              <h3 className="card-title">Asked Question</h3>
              <p className="card-body">What are the long-term effects of machine learning on education systems?</p>
              <div className="card-meta">Asked • 2 answers • 5 views</div>
              <span className="wipe"></span>
            </article>
          )}

          {active === "answered" && (
            <article className="card example-card">
              <h3 className="card-title">Answered</h3>
              <p className="card-body">AI can personalize learning experiences and help teachers identify problems early.</p>
              <div className="card-meta">Answered • 12 upvotes • 3 comments</div>
              <span className="wipe"></span>
            </article>
          )}

          {active === "posts" && (
            <article className="card example-card">
              <h3 className="card-title">Post</h3>
              <p className="card-body">“Technology should empower curiosity — not replace it.” — short thread on AI & education.</p>
              <div className="card-meta">Posted • Jul 30</div>
              <span className="wipe"></span>
            </article>
          )}

          {active === "veena" && (
            <article className="card example-card">
              <h3 className="card-title">Asked Veena</h3>
              <p className="card-body">How does Veena AI handle moral/ethical ambiguity when answering user questions?</p>
              <div className="card-meta">Veena • 1 reply</div>
              <span className="wipe"></span>
            </article>
          )}

          {active === "activity" && (
            <article className="card example-card">
              <h3 className="card-title">Activity</h3>
              <p className="card-body">Last active: 3 hours ago • 12 answers • 3 questions</p>
              <span className="wipe"></span>
            </article>
          )}
        </section>
      </main>

      {/* Edit modal */}
      {showEdit && (
        <div className="edit-backdrop" onClick={() => setShowEdit(false)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
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
