import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronRight, FaBars } from "react-icons/fa";
import './Navbar.css';
import { driversSublinks, teamsSublinks } from '../navbarContent';

export default function Navbar() {
  const [sublinks, setSublinks] = useState('');
  const [mainSublink, setMainSublink] = useState('');
  const [showSublinks, setShowSublinks] = useState(false);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [linksDelay, setLinksDelay] = useState(0);
  const menuRef = useRef(null);
  const location = useLocation();
  
  function displaySublinks(e) {
    if (e.currentTarget.dataset.link === 'drivers') {
      setMainSublink(
        <Link to="/drivers" className="driver-sublink">
          <div className="sublink">
            <p className="text-white">All Drivers</p>
            <FaChevronRight className="text-white" />
          </div>
        </Link>);

      setSublinks(driversSublinks.map(item => {
        return (
          <Link to={`/drivers/${item.id}`} className="driver-sublink" key={item.name}>
            <div className="sublink" style={{color: `var(--${item.teamId}_color)`}}>
              <p className="text-white" style={{borderLeft: `6px solid var(--${item.teamId}_color)`}}>{item.name} <span>{item.surname}</span></p>
              <FaChevronRight className="text-white" />
            </div>
        </Link>);
      }));
    } else if (e.currentTarget.dataset.link === 'teams') {
      setMainSublink(
        <Link to="/teams" className="all-teams-sublinks">
          <div className="sublink">
            <p className="text-white">All Teams</p>
            <FaChevronRight className="text-white" />
          </div>
        </Link>);

      setSublinks(teamsSublinks.map(item => {
        return (
          <Link to={`/teams/${item.code}/${item.name}`} key={item.code}>
            <div className="team-sublink sublink" style={{color: `var(--${item.code}_color)`}}>
              <div className="team-sublink-name">
                <p className="text-white">{item.name}</p>
                <FaChevronRight className="text-white" />
              </div>
              <div className="sublink-img-wrapper">
                <img src={`/images/teams/${item.code}_car.png`} alt={`${item.name}_car`} />
              </div>
            </div>
          </Link>);
        }));
    }
    // display sublinks
    setShowSublinks(true);
  }

  function hideSublinks() {
    setShowSublinks(false);
  }

  // smooth animation of links appearance
  function delayAnimation() {
    // when displaying dropdown menu
    const dropdownLinks = document.querySelectorAll('.dropdown-menu-list li');
    if (!showDropdownMenu) {
      dropdownLinks.forEach((li, index) => {
        setTimeout(() => {
          li.style.opacity = 1;
        }, linksDelay + index * 180)
      });
      setLinksDelay(linksDelay + [...dropdownLinks].length * 180);
    } 
    // when hiding dropdown menu
    else {
      dropdownLinks.forEach(li => {
        li.style.opacity = 0;
      });
      setLinksDelay(0);
    }
  }

  useEffect(() => {
    // set dynamic height of the links list
    if (menuRef.current) {
      if (showDropdownMenu) {
        menuRef.current.style.height = `${menuRef.current.scrollHeight}px`;
      } else {
        menuRef.current.style.height = '0';
      }
    }
  }, [showDropdownMenu]);

  // hide dropdown menu after clicking menu links
  useEffect(() => {
    setShowDropdownMenu(false);
  }, [location])

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
            <li data-link="home"><Link to="/">Home</Link></li>
            <li data-link="schedule"><Link to="/schedule">Schedule</Link></li>
            <li data-link="drivers" onMouseOver={displaySublinks} onMouseOut={hideSublinks}>
              <Link to="/drivers">Drivers
                <FaChevronDown />
              </Link>
            </li>
            <li data-link="teams" onMouseOver={displaySublinks} onMouseOut={hideSublinks}>
              <Link to="/teams">Teams
                <FaChevronDown />
              </Link>
            </li>
            <li data-link="archive"><Link to="/archive">Archive</Link></li>
          </ul>
        </div>
      </nav>

      {/* mobile dropdown menu */}
      <nav className="navbar-sm">
        <div className="nav-sm-header">
          <button className={`toggle-btn ${showDropdownMenu ? 'toggle-btn--rotate' : ''}`} onClick={() => {setShowDropdownMenu(!showDropdownMenu);
          delayAnimation()}}>
            <FaBars />
          </button>
          <Link to="/">
            <div className="navbar-logo-wrapper">
              <img src="/images/f1_logo.svg" alt="f1 logo" />
            </div>
          </Link>
        </div>
        <div ref={menuRef} className="dropdown-menu">
          <ul className="dropdown-menu-list">
            <li data-link="schedule">
              <Link to="/schedule">Schedule
                <FaChevronRight />
              </Link>
            </li>
            <li data-link="drivers">
              <Link to="/drivers">Drivers
                <FaChevronRight />
              </Link>
            </li>
            <li data-link="teams">
              <Link to="/teams">Teams
                <FaChevronRight />
              </Link>
            </li>
            <li data-link="archive">
              <Link to="/archive">Archive
                <FaChevronRight />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className={`navbar-sublinks ${showSublinks ? 'show-sublinks' : ''}`} onMouseOver={displaySublinks} onMouseOut={hideSublinks}>
        {mainSublink}
        {sublinks}
      </div>
    </div>
  );
}