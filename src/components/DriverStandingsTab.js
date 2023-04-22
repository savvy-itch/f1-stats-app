import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";

export default function DriverStandingsTab({ results }) {
  const { StandingsTable } = results;
  const { StandingsLists } = StandingsTable || {};
  const { DriverStandings } = StandingsLists?.[0] || {};

  return (
    <div className="tab-results-table">
      <h2>Driver Standings</h2>
      {DriverStandings &&
      <div className="tab-podium">
        <Link to={`/drivers/${DriverStandings[1].Driver.driverId}`}>
          <div className="tab-podium-card tab-podium-card--hide">
            <div style={{ color: `var(--${DriverStandings[1].Constructors[0].constructorId}_color)`}} className="tab-podium-avatar">
              <h3>2</h3>
              <img src={`/images/drivers/${DriverStandings[1].Driver.code}-thumbnail.png`} 
              alt={DriverStandings[1].Driver.driverId} 
              />
            </div>
            <div className="tab-podium-name">
              <p>{DriverStandings[1].Driver.givenName}</p>
              <p>{DriverStandings[1].Driver.familyName}</p>
            </div>
          </div>
        </Link>

        <Link to={`/drivers/${DriverStandings[0].Driver.driverId}`} className="tab-podium-card--display">
          <div className="tab-podium-card winner-card">
            <div style={{ color: `var(--${DriverStandings[0].Constructors[0].constructorId}_color)`}} className="tab-podium-avatar">
              <h3>1</h3>
              <img src={`/images/drivers/${DriverStandings[0].Driver.code}-thumbnail.png`} 
              alt={DriverStandings[0].Driver.driverId} 
              />
            </div>
            <div className="tab-podium-name">
              <p>{DriverStandings[0].Driver.givenName}</p>
              <p>{DriverStandings[0].Driver.familyName}</p>
            </div>
          </div>
        </Link>

        <Link to={`/drivers/${DriverStandings[2].Driver.driverId}`}>
          <div className="tab-podium-card tab-podium-card--hide">
            <div style={{ color: `var(--${DriverStandings[2].Constructors[0].constructorId}_color)`}} className="tab-podium-avatar">
              <h3>3</h3>
              <img src={`/images/drivers/${DriverStandings[2].Driver.code}-thumbnail.png`} 
              alt={DriverStandings[2].Driver.driverId} 
              />
            </div>
            <div className="tab-podium-name">
              <p>{DriverStandings[2].Driver.givenName}</p>
              <p>{DriverStandings[2].Driver.familyName}</p>
            </div>
          </div>
        </Link>
      </div>
      }
      {DriverStandings?.map(item => {
        return (
        <Link to={`/drivers/${item.Driver.driverId}`} key={item.position}>
          <div className="tab-results-row">
            <p style={{ borderColor: `var(--${item.Constructors[0].constructorId}_color)`}}>{item.position}</p>
            <p>{item.Driver.givenName} <strong>{item.Driver.familyName}</strong> <span className="tab-row-team">{item.Constructors[0].name}</span></p>
            <p>{item.points} PTS</p>
            <FaChevronRight />
          </div>
        </Link>)
      })
      }
      <div className="tab-btn-wrapper">
        <Link to="/drivers">
          <button className="tab-more-btn">VIEW FULL STANDINGS <FaChevronRight /></button>
        </Link>
      </div>
    </div>
  )
}