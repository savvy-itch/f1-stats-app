import React from 'react';
import { Link } from 'react-router-dom';

export default function Driver({ driver }) {
  const onmouseover = {
    color: `var(--${driver.Constructors[0].constructorId}_color)`,
  }

  return (
    <Link to={`/drivers/${driver.Driver.driverId}`}>
      <div className="driver-card">
        <fieldset style={onmouseover}>
          <div className="driver-position text">
            <div>{driver.position}</div>
            <div className="driver-pos-pts">
              {driver.points}
              <div>PTS</div>
            </div>
          </div>
          <div className="divider-line"></div>
          <div className="driver-name text" style={onmouseover}>
            <div>
              <p>{driver.Driver.givenName}</p>
              <strong>{driver.Driver.familyName}</strong>
            </div>
          </div>
          <div className="divider-line"></div>
          <div className="driver-add-div">
            <p>{driver.Constructors[0].name}</p>
            <div className="driver-image-div">
              <div>{driver.Driver.permanentNumber}</div>
              <img src={`/images/drivers/${driver.Driver.code}-thumbnail.png`} alt={driver.Driver.driverId} />
            </div>
          </div>
        </fieldset>
      </div>
    </Link>
  )
}