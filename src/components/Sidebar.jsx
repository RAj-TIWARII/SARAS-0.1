import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <>
      {/* Mobile toggle button */}
      <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <aside className={`profile-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="side-buttons">
          <Link to="/" onClick={toggleSidebar}>
            <button>Home</button>
          </Link>
          <Link to="/profile" onClick={toggleSidebar}>
            <button>Profile</button>
          </Link>
          <button>Work Lab</button>
          <button>Community</button>
          <button>Messages</button>
          <button>Bookmarks</button>
          <button>Settings</button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
