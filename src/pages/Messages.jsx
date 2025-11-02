import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Messages.css";

export default function Messages() {
  const navigate = useNavigate();

  // Dummy chat users
  const [contacts] = useState([
    { id: 1, name: "Ananya Rao", username: "@ananya_rao", lastSeen: "Online" },
    { id: 2, name: "Rahul Mehta", username: "@rahul_m", lastSeen: "2m ago" },
    { id: 3, name: "Neha Verma", username: "@neha_v", lastSeen: "10m ago" },
  ]);

  const [activeChat, setActiveChat] = useState(contacts[0]);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("sarasMessages");
    return saved ? JSON.parse(saved) : {};
  });
  const [input, setInput] = useState("");

  // Save chat to localStorage
  useEffect(() => {
    localStorage.setItem("sarasMessages", JSON.stringify(messages));
  }, [messages]);

  // Send message
  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = {
      sender: "You",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = {
      ...messages,
      [activeChat.id]: [...(messages[activeChat.id] || []), newMsg],
    };
    setMessages(updated);
    setInput("");
  };

  return (
    <div className="saras-page messages-page">
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
            placeholder="Search messages..."
          />
        </div>

        <div className="nav-right">
          <button className="login-pill">Login</button>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className="profile-sidebar">
        <div className="side-buttons">
          <button className="side-btn" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="side-btn" onClick={() => navigate("/profile")}>
            Profile
          </button>
          <button className="side-btn" onClick={() => navigate("/worklab")}>
            Work Lab
          </button>
          <button className="side-btn" onClick={() => navigate("/community")}>
            Community
          </button>
          <button
            className="side-btn side-active"
            onClick={() => navigate("/messages")}
          >
            Messages
          </button>
          <button className="side-btn" onClick={() => navigate("/bookmarks")}>
            Bookmarks
          </button>
          <button className="side-btn" onClick={() => navigate("/settings")}>
            Settings
          </button>
        </div>
      </aside>

      {/* MAIN CHAT SECTION */}
      <main className="chat-container">
        {/* LEFT - CONTACTS */}
        <div className="chat-list">
          <h3>Messages</h3>
          {contacts.map((c) => (
            <div
              key={c.id}
              className={`chat-contact ${
                activeChat.id === c.id ? "active" : ""
              }`}
              onClick={() => setActiveChat(c)}
            >
              <div className="contact-avatar">{c.name.charAt(0)}</div>
              <div className="contact-info">
                <p className="contact-name">{c.name}</p>
                <span className="contact-username">{c.username}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CENTER - CHAT WINDOW */}
        <div className="chat-box">
          <div className="chat-header">
            <div>
              <h4>{activeChat.name}</h4>
              <p>{activeChat.lastSeen}</p>
            </div>
          </div>

          <div className="chat-messages">
            {(messages[activeChat.id] || []).map((msg, i) => (
              <div
                key={i}
                className={`message ${
                  msg.sender === "You" ? "sent" : "received"
                }`}
              >
                <p>{msg.text}</p>
                <span>{msg.time}</span>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>
              <FaPaperPlane />
            </button>
          </div>
        </div>

        {/* RIGHT MINI PANEL */}
        <div className="chat-profile">
          <h3>User Info</h3>
          <div className="profile-card">
            <div className="avatar">{activeChat.name.charAt(0)}</div>
            <h4>{activeChat.name}</h4>
            <p>{activeChat.username}</p>
            <p className="status">{activeChat.lastSeen}</p>
            <button className="btn-view-profile">View Profile</button>
          </div>
        </div>
      </main>
    </div>
  );
}
