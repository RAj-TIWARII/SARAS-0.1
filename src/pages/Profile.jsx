import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Your Profile</h1>
        <p>View and edit your details here.</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="avatar-placeholder"></div>
          <h3>Raj Tiwari</h3>
          <p>@rajztiwari</p>

          <button className="edit-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
