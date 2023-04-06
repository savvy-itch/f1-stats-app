import React, { useEffect, useState } from 'react';
import GrandPrix from '../components/GrandPrix';
import NextRace from '../components/NextRace';
import './Schedule.css'

const url1 = 'http://ergast.com/api/f1/current.json';
const url2 = 'https://v1.formula-1.api-sports.io/seasons'
const url1Headers = {
  method: 'GET',
}
const url2Headers = {
	method: 'GET',
	headers: {
		"x-rapidapi-host": "https://v1.formula-1.api-sports.io",
		"x-rapidapi-key": "51482715129beb99b4d1186651ad73a8"
	}
}
const nextRaceUrl = 'https://ergast.com/api/f1/current/next.json'

export default function Schedule() {
  const [currentSeason, setCurrentSeason] = useState([]);
  const [nextRace, setNextRace] = useState({});
  // all the clickable race links
  const [racesLinks, setRacesLinks] = useState([]);

  function fetchData1() {
    return fetch(url1)
    .then(response => response.json())
    .then(currentSeason => {
      setCurrentSeason(currentSeason.MRData.RaceTable.Races);
      const newRaces = currentSeason.MRData.RaceTable.Races.map(obj => 
        ({id: obj.Circuit.circuitId, raceName: obj.raceName}));
      setRacesLinks(newRaces);
      // console.log(newRaces);
      // console.log(currentSeason.MRData.RaceTable.Races)
    })
    .catch(err => console.error(err));
  }

  function fetchData2() {
    return fetch(url2, url2Headers)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  }

  async function fetchNextRace() {
    try {
      const response = await fetch(nextRaceUrl);
      const nextRace = await response.json();
      setNextRace(nextRace.MRData.RaceTable);
      // console.log(nextRace)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData1();
    fetchNextRace();
    // fetchData2();
  }, []);

  return (
    <div className="schedule-container">
      {Object.keys(nextRace).length > 0 && 
        <>
          <div className="heading-container">
            <h1 className="schedule-heading">F1 Schedule {nextRace.season}</h1>
            <p>{nextRace.season} FIA FORMULA ONE WORLD CHAMPIONSHIP™ RACE CALENDAR</p>
          </div>
          <NextRace nextRace={nextRace} />
        </>
      }

      <section className="grand-prix-grid">
        {currentSeason.map((grandPrix, index) => {
          return (
            <GrandPrix key={grandPrix.Circuit.circuitId} grandPrix={grandPrix} index={index} />
          )
        })}
      </section>
    </div>
  )
}