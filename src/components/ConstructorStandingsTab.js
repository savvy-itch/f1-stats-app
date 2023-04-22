import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";

export default function ConstructorStandingsTab({ results }) {
  const { StandingsTable } = results;
  const { StandingsLists } = StandingsTable || {};
  const { ConstructorStandings } = StandingsLists?.[0] || {};

  return (
    <div className="tab-results-table">
      <h2>Constructor Standings</h2>
      {ConstructorStandings &&
      <div className="tab-podium">
        <Link to={`/teams/${ConstructorStandings[1].Constructor.constructorId}/${ConstructorStandings[1].Constructor.name}`}>
          <div className="tab-team-podium-card tab-podium-card--hide">
            <img className="team-podium-logo-img" src={`/images/teams/${ConstructorStandings[1].Constructor.name}_logo_lg.jpg`} alt="team logo" />
            <h3 style={{ color: `var(--${ConstructorStandings[1].Constructor.constructorId}_color)`}}>2</h3>
            <img className="team-podium-car-img" src={`/images/teams/${ConstructorStandings[1].Constructor.constructorId}_car.png`} 
            alt={ConstructorStandings[1].Constructor.constructorId} />
          </div>
        </Link>
        <Link to={`/teams/${ConstructorStandings[0].Constructor.constructorId}/${ConstructorStandings[0].Constructor.name}`} className="tab-podium-card--display">
          <div className="tab-team-podium-card winner-team-card">
            <img className="team-podium-logo-img" src={`/images/teams/${ConstructorStandings[0].Constructor.name}_logo_lg.jpg`} alt="team logo" />
            <h3 style={{ color: `var(--${ConstructorStandings[0].Constructor.constructorId}_color)`}}>1</h3>
            <img className="team-podium-car-img" src={`/images/teams/${ConstructorStandings[0].Constructor.constructorId}_car.png`} 
            alt={ConstructorStandings[0].Constructor.constructorId} />
          </div>
        </Link>
        <Link to={`/teams/${ConstructorStandings[2].Constructor.constructorId}/${ConstructorStandings[2].Constructor.name}`}>
          <div className="tab-team-podium-card tab-podium-card--hide">
            <img className="team-podium-logo-img" src={`/images/teams/${ConstructorStandings[2].Constructor.name}_logo_lg.jpg`} alt="team logo" />
            <h3 style={{ color: `var(--${ConstructorStandings[2].Constructor.constructorId}_color)`}}>3</h3>
            <img className="team-podium-car-img" src={`/images/teams/${ConstructorStandings[2].Constructor.constructorId}_car.png`} 
            alt={ConstructorStandings[2].Constructor.constructorId} />
          </div>
        </Link>
      </div>
      }
      {ConstructorStandings?.map(item => {
        return (
        <Link to={`/teams/${item.Constructor.constructorId}/${item.Constructor.name}`} key={item.position}>
          <div className="tab-results-row tab-constructor-results-row">
            <p style={{ borderColor: `var(--${item.Constructor.constructorId}_color)`}}>{item.position}</p>
            <p><strong>{item.Constructor.name}</strong></p>
            <div className="tab-row-car-img">
              <img src={`/images/teams/${item.Constructor.constructorId}_car.png`} alt="team logo" />
            </div>
            <p>{item.points} PTS</p>
            <FaChevronRight />
          </div>
        </Link>)
      })
      }
      <div className="tab-btn-wrapper">
        <Link to="/teams">
          <button className="tab-more-btn">VIEW FULL STANDINGS <FaChevronRight /></button>
        </Link>
      </div>
    </div>
  )
}