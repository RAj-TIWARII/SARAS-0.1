import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    localStorage.setItem("sarasLoggedIn", "true");
    localStorage.setItem("sarasUser", email);
    if (remember) localStorage.setItem("sarasRemember", "true");
    navigate("/profile");
  };

  return (
    <div className="login-page">
      <div className="login-glass">
        <div className="login-brand">
          <h1 className="saras-logo">
            <span className="lotus">SARA</span>
            <span className="softblue">S</span>
          </h1>
          <p className="tagline">Where Curiosity Finds Clarity 🌸</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <h2>Welcome Back</h2>
          <p className="form-subtext">Sign in to continue your journey.</p>

          <input
            type="email"
            placeholder="Email or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-text">{error}</p>}

          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />{" "}
              Remember me
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="login-btn">Login</button>

          <div className="divider">or</div>

          <div className="social-login">
            <button type="button" className="google-btn">
              <img
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                alt="Google"
              />
              Continue with Google
            </button>
            <button type="button" className="github-btn">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733609.png"
                alt="GitHub"
              />
              Continue with GitHub
            </button>
          </div>

          <p className="register-text">
            New here?{" "}
            <span onClick={() => navigate("/register")}>Create an account</span>
          </p>
        </form>

        <p className="footer-quote">“Powered by Curiosity.”</p>
      </div>
    </div>
  );
}
