import React, { useEffect, useState } from 'react';
import GrandPrix from '../components/GrandPrix';
import NextRace from '../components/NextRace';
import Loading from '../components/Loading';
import './Schedule.css'

const url1 = 'https://ergast.com/api/f1/current.json';
const nextRaceUrl = 'https://ergast.com/api/f1/current/next.json'

export default function Schedule() {
  const [loading, setLoading] = useState(false);
  const [currentSeason, setCurrentSeason] = useState([]);
  const [nextRace, setNextRace] = useState({});
  // all the clickable race links
  const [racesLinks, setRacesLinks] = useState([]);

  function fetchData1() {
    setLoading(true);
    return fetch(url1)
    .then(response => response.json())
    .then(currentSeason => {
      setCurrentSeason(currentSeason.MRData.RaceTable.Races);
      const newRaces = currentSeason.MRData.RaceTable.Races.map(obj => 
        ({id: obj.Circuit.circuitId, raceName: obj.raceName}));
      setRacesLinks(newRaces);
      setLoading(false);
    })
    .catch(err => {
      setLoading(false);
      console.error(err)
    });
  }

  async function fetchNextRace() {
    setLoading(true);
    try {
      const response = await fetch(nextRaceUrl);
      const nextRace = await response.json();
      setNextRace(nextRace.MRData.RaceTable);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData1();
    fetchNextRace();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    )
  }

  return (
    <div className="schedule-container">
    {Object.keys(nextRace).length > 0 && 
      <>
        <div className="heading-container container-sm">
          <h1 className="schedule-heading">F1 Schedule {nextRace.season}</h1>
          <p>{nextRace.season} FIA FORMULA ONE WORLD CHAMPIONSHIP™ RACE CALENDAR</p>
        </div>
        <NextRace nextRace={nextRace} />
      </>
    }
      <section className="grand-prix-grid container-sm">
        {currentSeason.map((grandPrix, index) => {
          return (
            <GrandPrix key={grandPrix.Circuit.circuitId} grandPrix={grandPrix} index={index} />
          )
        })}
      </section>
    </div>
  )
}