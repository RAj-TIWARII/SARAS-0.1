import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import {
  FaArrowUp,
  FaArrowDown,
  FaReply,
  FaRetweet,
  FaFlag,
} from "react-icons/fa";

const Home = () => {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) setShowNav(false);
    else setShowNav(true);
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const questions = [
    {
      id: 1,
      user: "Aditi Sharma",
      username: "@aditi_s",
      question: "What are the main applications of AI in the medical field?",
      answer:
        "AI assists in diagnostics, patient monitoring, drug discovery, and healthcare data analysis. It helps identify diseases earlier and improves accuracy in treatment decisions.",
    },
    {
      id: 2,
      user: "Rahul Mehta",
      username: "@rahul_m",
      question: "How does quantum computing differ from classical computing?",
      answer:
        "Quantum computing uses qubits that exist in multiple states simultaneously, enabling exponentially faster computation compared to binary-based classical computers.",
    },
    {
      id: 3,
      user: "Neha Verma",
      username: "@neha_v",
      question: "What is the role of satellites in precision agriculture?",
      answer:
        "Satellites provide crucial data on soil health, weather, and crop patterns to help farmers make data-driven decisions and increase yield efficiency.",
    },
  ];

  return (
    <div className="saras-page">
      {/* Top Navbar */}
      <header className={`saras-navbar ${showNav ? "visible" : "hidden"}`}>
        <div className="saras-title">
          <span className="lotus">SARA</span>
          <span className="softblue">S</span>
        </div>

        <div className="nav-center">
          <input type="text" placeholder="Search questions..." />
        </div>

        <div className="nav-right">
          <span className="user-login">Login</span>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="profile-sidebar">
        <div className="side-buttons">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button>Work Lab</button>
          <button>Community</button>
          <button>Messages</button>
          <button>Bookmarks</button>
          <button>Settings</button>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="saras-main">
        <div className="question-feed">
          {questions.map((q) => (
            <div className="question-card" key={q.id}>
              <div className="user-section">
                <h4 className="user-name">{q.user}</h4>
                <p className="user-handle">{q.username}</p>
              </div>

              <div className="question-content">
                <h3 className="question-text">{q.question}</h3>
                <p className="answer-text">{q.answer}</p>
              </div>

              <div className="question-actions">
                <button title="Upvote">
                  <FaArrowUp />
                </button>
                <button title="Downvote">
                  <FaArrowDown />
                </button>
                <button title="Ask Veena">
                  <FaReply />
                </button>
                <button title="Share">
                  <FaRetweet />
                </button>
                <button title="Report">
                  <FaFlag />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
