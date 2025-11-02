import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaChartLine, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./WorkLab.css";

export default function WorkLab() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("sarasProjects");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Gesture-Controlled Smart Wheelchair",
            summary:
              "A system that interprets finger movements to control a wheelchair for physically disabled users.",
            tags: ["AI", "IoT", "Healthcare"],
            progress: 75,
          },
          {
            id: 2,
            title: "Arduino Rocket Telemetry",
            summary:
              "A low-cost micro rocket powered by Arduino with onboard sensors and live camera feed for under ₹2500.",
            tags: ["Aerospace", "Arduino", "ISRO"],
            progress: 55,
          },
        ];
  });

  const [showAdd, setShowAdd] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    summary: "",
    tags: "",
    progress: 0,
  });

  useEffect(() => {
    localStorage.setItem("sarasProjects", JSON.stringify(projects));
  }, [projects]);

  const avgProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce((sum, p) => sum + p.progress, 0) / projects.length
        )
      : 0;

  return (
    <div className="saras-page worklab-page">
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
          <input
            className="nav-search"
            type="search"
            placeholder="Search projects..."
          />
        </div>

        <div className="nav-right">
          <button className="login-pill">Login</button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="profile-sidebar">
        <div className="side-buttons">
          <button className="side-btn" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="side-btn" onClick={() => navigate("/profile")}>
            Profile
          </button>
          <button className="side-btn side-active" onClick={() => navigate("/worklab")}>
            Work Lab
          </button>
         <button className="side-btn" onClick={() => navigate("/community")}>
  Community
</button>

         <button className="side-btn" onClick={() => navigate("/messages")}>
  Messages
</button>
          <button className="side-btn" onClick={() => navigate("/bookmarks")}>Bookmarks</button>

          <button className="side-btn" onClick={() => navigate("/settings")}>Settings</button>

        </div>
      </aside>

      {/* Main Section */}
      <main className="worklab-main">
        <h1 className="worklab-title">Work Lab</h1>
        <p className="worklab-subtitle">
          Explore ongoing projects, experiments, and prototypes created by the community.
        </p>

        <div className="stats-bar">
          <span>{projects.length} Projects</span>
          <span>
            <FaChartLine /> Avg Progress: {avgProgress}%
          </span>
        </div>

        <button className="add-project-btn" onClick={() => setShowAdd(true)}>
          <FaPlus /> Add Project
        </button>

        <div className="projects-grid">
          {projects.map((p) => (
            <div className="project-card" key={p.id}>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-summary">{p.summary}</p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${p.progress}%` }}
                ></div>
              </div>
              <p className="progress-label">Progress: {p.progress}%</p>

              <div className="tag-container">
                {p.tags.map((t, i) => (
                  <span className="tag" key={i}>
                    {t}
                  </span>
                ))}
              </div>

              <button className="view-btn">View Details</button>
            </div>
          ))}
        </div>
      </main>

      {/* Add Project Modal */}
      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Project</h2>
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
            />
            <textarea
              placeholder="Short Summary"
              value={newProject.summary}
              onChange={(e) =>
                setNewProject({ ...newProject, summary: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={newProject.tags}
              onChange={(e) =>
                setNewProject({ ...newProject, tags: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Progress (0–100)"
              value={newProject.progress}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  progress: Math.min(100, Math.max(0, e.target.value)),
                })
              }
            />

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowAdd(false)}>
                Cancel
              </button>
              <button
                className="btn-save"
                onClick={() => {
                  if (!newProject.title || !newProject.summary)
                    return alert("Fill all fields!");
                  const tagsArray = newProject.tags
                    .split(",")
                    .map((t) => t.trim());
                  const updated = [
                    ...projects,
                    { id: Date.now(), ...newProject, tags: tagsArray },
                  ];
                  setProjects(updated);
                  setShowAdd(false);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
