import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaChartLine,
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const defaultName = "Raj Tiwari";

  // profile state
  const [name, setName] = useState(defaultName);
  const [handle, setHandle] = useState("rajztiwari");
  const [active, setActive] = useState("asked");
  const [showEdit, setShowEdit] = useState(false);

  // banner/avatar previews (object URLs)
  const [bannerUrl, setBannerUrl] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const prevBannerRef = useRef(null);
  const prevAvatarRef = useRef(null);

  // hidden inputs
  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  // revoke previous object URLs on change / cleanup
  useEffect(() => {
    return () => {
      if (prevBannerRef.current) URL.revokeObjectURL(prevBannerRef.current);
      if (prevAvatarRef.current) URL.revokeObjectURL(prevAvatarRef.current);
    };
  }, []);

  const handleBannerSelect = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (prevBannerRef.current) URL.revokeObjectURL(prevBannerRef.current);
    const u = URL.createObjectURL(f);
    prevBannerRef.current = u;
    setBannerUrl(u);
  };

  const handleAvatarSelect = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (prevAvatarRef.current) URL.revokeObjectURL(prevAvatarRef.current);
    const u = URL.createObjectURL(f);
    prevAvatarRef.current = u;
    setAvatarUrl(u);
  };

  const removeBanner = () => {
    if (prevBannerRef.current) {
      URL.revokeObjectURL(prevBannerRef.current);
      prevBannerRef.current = null;
    }
    setBannerUrl(null);
  };

  const removeAvatar = () => {
    if (prevAvatarRef.current) {
      URL.revokeObjectURL(prevAvatarRef.current);
      prevAvatarRef.current = null;
    }
    setAvatarUrl(null);
  };

  // Edit modal local temp state so Cancel restores previous
  const [tempName, setTempName] = useState(name);
  const [tempHandle, setTempHandle] = useState(handle);

  const openEdit = () => {
    setTempName(name);
    setTempHandle(handle);
    setShowEdit(true);
  };

  const saveEdit = () => {
    setName(tempName.trim() || defaultName);
    setHandle(tempHandle.replace(/\s+/g, "") || handle);
    setShowEdit(false);
  };

  // small helper for accessible button that triggers file input
  const triggerBannerChooser = () => bannerInputRef.current?.click();
  const triggerAvatarChooser = () => avatarInputRef.current?.click();

  return (
    <div className="saras-page profile-page">
      {/* NAVBAR */}
      <header className="saras-navbar">
        <div
          className="nav-left"
          onClick={() => navigate(-1)}
          role="button"
          aria-label="Go back"
          tabIndex={0}
        >
          <FaArrowLeft />
        </div>

        <div className="saras-title" aria-hidden>
          <span className="lotus">SARA</span>
          <span className="softblue">S</span>
        </div>

        <div className="nav-center">
          <input
            className="nav-search"
            type="search"
            placeholder="Search questions..."
            aria-label="Search"
          />
        </div>

        <div className="nav-right">
          <button className="login-pill">Login</button>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className="profile-sidebar">
        <div className="side-buttons">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/profile")} aria-current="page">
            Profile
          </button>
          <button
            onClick={() => {
              console.log("Navigating to Work Lab...");
              navigate("/worklab");
            }}
          >
            Work Lab
          </button>
          <button onClick={() => navigate("/community")}>Community</button>
          <button onClick={() => navigate("/messages")}>Messages</button>
          <button onClick={() => navigate("/bookmarks")}>Bookmarks</button>
          <button onClick={() => navigate("/settings")}>Settings</button>
        </div>
      </aside>

      {/* MAIN + RIGHT */}
      <div className="profile-container">
        {/* MAIN */}
        <main className="profile-main">
          {/* banner area */}
          <div
            className="profile-banner"
            style={
              bannerUrl
                ? { backgroundImage: `url(${bannerUrl})`, backgroundSize: "cover" }
                : {}
            }
            onClick={triggerBannerChooser}
            role="button"
            aria-label="Change banner"
          >
            <div className="banner-actions">
              <button className="ghost-btn" onClick={(e) => { e.stopPropagation(); triggerBannerChooser(); }}>
                Change banner
              </button>
              {bannerUrl && (
                <button
                  className="ghost-btn danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeBanner();
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            className="visually-hidden"
            onChange={handleBannerSelect}
          />

          <section className="profile-top">
            <div className="avatar-block">
              <div className="avatar" onClick={triggerAvatarChooser} role="button" aria-label="Change avatar">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="avatar preview" className="avatar-img" />
                ) : (
                  <span className="avatar-initial">{name.charAt(0)}</span>
                )}
                <div className="avatar-overlay">
                  <button
                    className="ghost-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerAvatarChooser();
                    }}
                  >
                    Change
                  </button>
                  {avatarUrl && (
                    <button
                      className="ghost-btn danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAvatar();
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="visually-hidden"
              onChange={handleAvatarSelect}
            />

            <div className="profile-meta">
              <div className="name-row">
                <h1 className="profile-name">{name}</h1>
                <span className="profile-handle">@{handle}</span>
              </div>

              <div className="stats-row">
                <div className="follow-stats">
                  <span>
                    <strong>694</strong> Following
                  </span>
                  <span>
                    <strong>159</strong> Followers
                  </span>
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
              <button className="edit-btn" onClick={openEdit}>
                Edit profile
              </button>
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
                <p className="card-body">
                  What are the long-term effects of machine learning on education systems?
                </p>
                <div className="card-meta">Asked • 2 answers • 5 views</div>
              </article>
            )}
            {active === "answered" && (
              <article className="content-card">
                <h3 className="card-title">Answered</h3>
                <p className="card-body">
                  AI can personalize learning experiences and help teachers identify problems early.
                </p>
                <div className="card-meta">Answered • 12 upvotes • 3 comments</div>
              </article>
            )}
            {active === "posts" && (
              <article className="content-card">
                <h3 className="card-title">Post</h3>
                <p className="card-body">
                  “Technology should empower curiosity — not replace it.” — short thread on AI & education.
                </p>
                <div className="card-meta">Posted • Jul 30</div>
              </article>
            )}
            {active === "veena" && (
              <article className="content-card">
                <h3 className="card-title">Asked Veena</h3>
                <p className="card-body">
                  How does Veena AI handle moral/ethical ambiguity when answering user questions?
                </p>
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
            <div className="info-item">
              <FaBriefcase /> Add employment credential
            </div>
            <div className="info-item">
              <FaGraduationCap /> Add education credential
            </div>
            <div className="info-item">
              <FaMapMarkerAlt /> Add location credential
            </div>
            <div className="info-item joined">
              <FaCalendarAlt /> Joined May 2021
            </div>
          </div>

          <div className="info-card">
            <h3>Knows about</h3>
            <p className="empty-note">You haven’t added any topics yet.</p>
            <button className="add-topic-btn">Add topics</button>
          </div>
        </aside>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div className="modal-backdrop" onClick={() => setShowEdit(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Edit profile</h2>

            <label className="modal-label">
              Name
              <input value={tempName} onChange={(e) => setTempName(e.target.value)} />
            </label>

            <label className="modal-label">
              Username
              <input value={tempHandle} onChange={(e) => setTempHandle(e.target.value)} />
            </label>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowEdit(false)}>
                Cancel
              </button>
              <button
                className="btn-save"
                onClick={() => {
                  saveEdit();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
