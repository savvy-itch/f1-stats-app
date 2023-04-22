import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";

export default function LastRaceTab({ results }) {
  const { RaceTable } = results;
  const { Races } = RaceTable || {};
  const { Results } = Races?.[0] || {};

  return (
    <div className="tab-results-table">
      <h2 className="tab-current-race-country">{Races[0].Circuit.Location.country}</h2>
      <h3 className="tab-current-season">{Races[0].season}</h3>
      <Link to={`/schedule/${Races[0].Circuit.circuitId}/${Races[0].round}`}>
        <p className="tab-last-gp-name">{Races[0].raceName}</p>
      </Link>
      {Results.map(item => {
        return (
        <Link to={`/drivers/${item.Driver.driverId}`} key={item.position}>
          <div className="tab-results-row">
            <p style={{ borderColor: `var(--${item.Constructor.constructorId}_color)`}}>{item.position}</p>
            <p>{item.Driver.givenName} <strong>{item.Driver.familyName}</strong> <span className="tab-row-team">{item.Constructor.name}</span></p>
            <p>{item.points} PTS</p>
            <FaChevronRight />
          </div>
        </Link>)
      })
      }
      <div className="tab-btn-wrapper">
        <Link to="/archive">
          <button className="tab-more-btn">RACE RESULTS <FaChevronRight /></button>
        </Link>
      </div>
    </div>
  )
}