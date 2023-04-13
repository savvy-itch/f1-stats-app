import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
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