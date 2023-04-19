import React, { useState, useEffect } from 'react';
import Driver from '../components/Driver';
import './Drivers.css'

const DRIVERS_URL = 'https://ergast.com/api/f1/current/driverStandings.json';

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);

  async function fetchDrivers(url) {
    try {
      const response = await fetch(url);
      const drivers = await response.json();
      setDrivers(drivers.MRData.StandingsTable.StandingsLists[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDrivers(DRIVERS_URL);
  }, []);

  return (
    <div className="drivers-container container-lg">
      <div className="drivers-heading">
        <h1>F1 Drivers {drivers.season}</h1>
      </div>
      <div className="drivers-desc">
      Check out this season's official F1 line-up. Full breakdown of drivers, points and current positions. Follow your favourite F1 drivers on and off the track.
      </div>
      <div className="drivers-grid">
      {drivers.DriverStandings && drivers.DriverStandings.map(d => {
        return <Driver driver={d} key={d.Driver.code} />
      })}
      </div>
    </div>
  )
}