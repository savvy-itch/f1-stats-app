import React from 'react';
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <Link to="/">Home</Link>
          <Link to="/schedule">Schedule</Link>
          <Link to="/drivers">Drivers</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/archive">Archive</Link>
        </div>
        <div className="footer-column">
          <h3>References</h3>
          <a href="https://www.formula1.com" target='_blank' rel="noopener noreferrer">The official Formula 1 website</a>
          <a href="https://ergast.com/mrd/terms/" target='_blank' rel="noopener noreferrer">Ergast API</a>
          <a href="https://api-sports.io/documentation/formula-1/v1" target='_blank' rel="noopener noreferrer">API-FORMULA-1</a>
        </div>
        <div className="footer-contact">
          <h3>Contact</h3>
          <div className="contact-links">
            <a href="https://github.com/savvy-itch" target='_blank' rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="mailto:sprone3@gmail.com">
              <GrMail />
            </a>
            <a href="https://www.linkedin.com/in/михайло-савич-a31366248/" target='_blank' rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-disclaimer">
        <p>Developed by Mykhailo Savych</p>
        <p>The materials on this website are for demonstration purposes only.</p>
      </div>
    </footer>
  )
}