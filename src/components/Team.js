import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// http://ergast.com/api/f1/current/constructors/mclaren/drivers.json
const TEAM_DRIVERS_URL = 'http://ergast.com/api/f1/current/constructors/';

export default function Team({ constructor }) {
  const [teamDrivers, setTeamDrivers] = useState([]);
  const onmouseover = {
    color: `var(--${constructor.Constructor.constructorId}_color)`,
  }

  console.log(constructor)

  async function fetchTeamDrivers(url) {
    try {
      const response = await fetch(url);
      const teamDrivers = await response.json();
      setTeamDrivers(teamDrivers.MRData.DriverTable.Drivers);
      // console.log(teamDrivers.MRData.DriverTable.Drivers);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTeamDrivers(`${TEAM_DRIVERS_URL}${constructor.Constructor.constructorId}/drivers.json`);
  }, []);

  return (
    <Link to={`/teams/${constructor.Constructor.constructorId}/${constructor.Constructor.name}`}>
      <div className="team-card">
        <fieldset style={onmouseover}>
          <div className="team-position text--color">
            <div>{constructor.position}</div>
            <div className="team-pos-pts">
              {constructor.points}
              <div>PTS</div>
            </div>
          </div>
          <div className="divider-line"></div>
          <div className="team-name text--color" style={onmouseover}>
            <div>
              <p>{constructor.Constructor.name}</p>
              <div className="team-logo-wrapper">
                <img src={`/images/teams/${constructor.Constructor.constructorId}_logo.png`} alt={`${constructor.Constructor.constructorId} logo`} />
              </div>
            </div>
          </div>
          <div className="divider-line"></div>
          {teamDrivers && teamDrivers.length > 0 &&
          <div className="team-drivers-div">
            <div className="team-single-driver-div">
              <div className="team-single-driver-name text--color">
                <p>{teamDrivers[0].givenName}</p> 
                <p>{teamDrivers[0].familyName}</p>
              </div>
              <div className="team-single-driver-avatar">
                <img src={`/images/drivers/${teamDrivers[0].code}-thumbnail.png`} alt="driver avatar" />
              </div>
            </div>
            <div className="team-single-driver-div">
              <div className="team-single-driver-name text--color">
                <p>{teamDrivers[1].givenName}</p> 
                <p>{teamDrivers[1].familyName}</p>
              </div>
              <div className="team-single-driver-avatar">
                <img src={`/images/drivers/${teamDrivers[1].code}-thumbnail.png`} alt="driver avatar" />
              </div>
            </div>
          </div>
          }
          <div className="team-image-div">
            <img src={`/images/teams/${constructor.Constructor.constructorId}_car.png`} alt={constructor.Constructor.constructorId} />
          </div>
        </fieldset>
      </div>
    </Link>
  )
}