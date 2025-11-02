import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserCircle,
  FaMoon,
  FaBell,
  FaDatabase,
  FaTrashAlt,
  FaLock,
  FaInfoCircle,
  FaPalette,
} from "react-icons/fa";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();

  // Local states
  const [name, setName] = useState(localStorage.getItem("sarasName") || "Raj Tiwari");
  const [username, setUsername] = useState(localStorage.getItem("sarasUser") || "rajztiwari");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("sarasDarkMode") === "true");
  const [accent, setAccent] = useState(localStorage.getItem("sarasAccent") || "lotus");
  const [notifications, setNotifications] = useState(localStorage.getItem("sarasNotify") === "true");
  const [performanceMode, setPerformanceMode] = useState(localStorage.getItem("sarasPerf") === "true");

  // Save settings
  useEffect(() => {
    localStorage.setItem("sarasName", name);
    localStorage.setItem("sarasUser", username);
    localStorage.setItem("sarasDarkMode", darkMode);
    localStorage.setItem("sarasAccent", accent);
    localStorage.setItem("sarasNotify", notifications);
    localStorage.setItem("sarasPerf", performanceMode);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [name, username, darkMode, accent, notifications, performanceMode]);

  const clearData = () => {
    localStorage.clear();
    alert("All local SARAS data cleared successfully.");
    window.location.reload();
  };

  return (
    <div className="saras-page settings-page">
      {/* NAVBAR */}
      <header className="saras-navbar">
        <div className="nav-left" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </div>
        <div className="saras-title">
          <span className="lotus">SARA</span><span className="softblue">S</span>
        </div>
        <div className="nav-center">
          <input className="nav-search" type="search" placeholder="Search settings..." />
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
          <button className="side-btn" onClick={() => navigate("/bookmarks")}>Bookmarks</button>
          <button className="side-btn side-active" onClick={() => navigate("/settings")}>Settings</button>
        </div>
      </aside>

      {/* MAIN SETTINGS */}
      <main className="settings-container">
        <h2 className="settings-title">Settings</h2>
        <p className="settings-subtitle">Customize your SARAS experience.</p>

        {/* Profile & Account */}
        <section className="settings-card">
          <h3><FaUserCircle /> Profile & Account</h3>
          <div className="setting-item">
            <label>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="setting-item">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <button className="edit-btn" onClick={() => navigate("/profile")}>Edit Profile</button>
        </section>

        {/* Appearance */}
        <section className="settings-card">
          <h3><FaPalette /> Appearance</h3>
          <div className="setting-toggle">
            <label>Dark Mode</label>
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </div>
          <div className="setting-item">
            <label>Accent Color</label>
            <select value={accent} onChange={(e) => setAccent(e.target.value)}>
              <option value="lotus">Lotus Pink</option>
              <option value="wheat">Wheat Gold</option>
              <option value="night">Night Purple</option>
            </select>
          </div>
        </section>

        {/* Notifications */}
        <section className="settings-card">
          <h3><FaBell /> Notifications</h3>
          <div className="setting-toggle">
            <label>Enable Notifications</label>
            <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
          </div>
          <div className="setting-toggle">
            <label>Mentions & Replies</label>
            <input type="checkbox" />
          </div>
        </section>

        {/* System Preferences */}
        <section className="settings-card">
          <h3><FaDatabase /> System Preferences</h3>
          <div className="setting-toggle">
            <label>Performance Mode</label>
            <input type="checkbox" checked={performanceMode} onChange={() => setPerformanceMode(!performanceMode)} />
          </div>
          <button className="clear-btn" onClick={clearData}><FaTrashAlt /> Clear Local Data</button>
        </section>

        {/* Privacy & Security */}
        <section className="settings-card">
          <h3><FaLock /> Privacy & Security</h3>
          <p>Manage your personal data and privacy preferences.</p>
          <button className="logout-btn">Logout (Future)</button>
        </section>
      </main>
    </div>
  );
}
