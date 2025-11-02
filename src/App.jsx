import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import WorkLab from "./pages/WorkLab";
import Community from "./pages/Community";
import Messages from "./pages/Messages";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/WorkLab" element={<WorkLab />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/Bookmarks" element={<Bookmarks />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
