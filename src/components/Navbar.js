import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import './Navbar.css';
import { driversSublinks } from '../navbarContent';

export default function Navbar() {
  const [sublinks, setSublinks] = useState('');
  const links = document.querySelectorAll('.navbar-links-container > li')
  const linkDetailsDiv = document.querySelector('.navbar-link-details');
  
  const driversSublinksContent = `
  <div className="sublink">
    <p>Max Verstappen</p>
    <FaChevronRight />
  </div>
  `;
  const teamsSublinksContent = `
  <div className="sublink">
    <p>Red Bull</p>
    <FaChevronRight />
  </div>
  `

  function displaySublinks(e) {
    if (e.currentTarget.dataset.link === 'drivers') {
      setSublinks(driversSublinks.map(item => {
        return (
        <div className="sublink" style={{color: `var(--${item.team}_color)`}} key={item.name}>
          <p className="text-white" style={{borderLeft: `6px solid var(--${item.team}_color)`}}>{item.name}</p>
          <FaChevronRight className="text-white" />
        </div>
        )
      }));
    } else if (e.currentTarget.dataset.link === 'teams') {
      setSublinks(<div className="sublink">
      <p>Red Bull</p>
      <FaChevronRight />
    </div>);
    }
  }

  return (
    <div>
      <nav className="navbar">
        <Link to="/">
          <div className="navbar-logo-wrapper">
            <img src="/images/f1_logo.svg" alt="f1 logo" />
          </div>
        </Link>
        <div className="navbar-links-container">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/schedule">Schedule</Link></li>
            <li data-link="drivers" onMouseOver={displaySublinks}>
              <Link to="/drivers">Drivers
                <FaChevronDown />
              </Link>
            </li>
            <li data-link="teams" onMouseOver={displaySublinks}>
              <Link to="/teams">Teams
                <FaChevronDown />
              </Link>
            </li>
            <li><Link to="/archive">Archive</Link></li>
          </ul>
        </div>
      </nav>
      <div className="navbar-sublinks">
        {sublinks}
      </div>
    </div>
  );
}