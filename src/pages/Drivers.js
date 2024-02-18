import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
import Driver from '../components/Driver';
import ScrollToTop from '../components/ScrollToTop';
import GoToTopBtn from '../components/GoToTopBtn';
import './Drivers.css'

const DRIVERS_URL = 'https://ergast.com/api/f1/current/driverStandings.json';

async function fetchDrivers() {
  try {
    const response = await fetch(DRIVERS_URL);
    const drivers = await response.json();
    return drivers.MRData.StandingsTable.StandingsLists[0]
  } catch (error) {
    console.log(error);
  }
}

export default function Drivers() {
  const { data: drivers, isLoading } = useQuery({
    queryKey: ['drivers'],
    queryFn: fetchDrivers,
  });

  if (isLoading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    )
  }

  return (
    <ScrollToTop>
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
      <GoToTopBtn />
    </ScrollToTop>
  )
}