import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <div className="navbar-logo-wrapper">
          <img src="/images/f1_logo.svg" alt="f1 logo" />
        </div>
      </Link>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/schedule">Schedule</Link></li>
        <li><Link to="/drivers">Drivers</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/archive">Archive</Link></li>
      </ul>
    </nav>
  );
}