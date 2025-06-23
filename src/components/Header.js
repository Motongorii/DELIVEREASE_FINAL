import React from "react";
import avatar from "../assets/avatar.png";

const Header = ({ onMenuClick }) => (
  <header className="dashboard-header">
    <button className="menu-button" onClick={onMenuClick}>
        <span role="img" aria-label="menu">☰</span>
    </button>
    <div className="header-user">
      <img src={avatar} alt="Admin" className="header-avatar" />
      <span className="header-user-name">Hello! <b>Fed</b></span>
    </div>
    <input className="header-search" placeholder="Search" />
  </header>
);

export default Header; 