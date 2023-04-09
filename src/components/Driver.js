import React from 'react';
import { Link } from 'react-router-dom';

export default function Driver({ driver }) {
  return (
    <Link to={`/drivers/${driver.Driver.driverId}`}>
      <div className="driver-card">
        <fieldset>
          <div>
            <div>{driver.position}</div>
            <div>
              {driver.points}
              <div>pts</div>
            </div>
          </div>
          <div className="divider-line"></div>
          <div>
            <div>
              <p>{driver.Driver.givenName}</p>
              <p>{driver.Driver.familyName}</p>
            </div>
          </div>
          <div className="divider-line"></div>
          <div>
            <p>{driver.Constructors[0].name}</p>
            <div>{driver.Driver.permanentNumber}</div>
            <img src="" alt="" />
          </div>
        </fieldset>
      </div>
    </Link>
  )
}
