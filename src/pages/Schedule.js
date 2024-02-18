import React from 'react';
import GrandPrix from '../components/GrandPrix';
import NextRace from '../components/NextRace';
import Loading from '../components/Loading';
import ScrollToTop from '../components/ScrollToTop';
import GoToTopBtn from '../components/GoToTopBtn';
import './Schedule.css'
import { currentResultsUrl } from '../globals';
import { useQuery } from '@tanstack/react-query';

const nextRaceUrl = 'https://ergast.com/api/f1/current/next.json'

export default function Schedule() {
  const { data: races, isLoading: isRacesLoading } = useQuery({
    queryKey: ['races'],
    queryFn: fetchData,
  });
  const { data: nextRace, isLoading: isNextRaceLoading } = useQuery({
    queryKey: ['nextRace'],
    queryFn: fetchNextRace,
  });

  function fetchData() {
    return fetch(`${currentResultsUrl}.json`)
    .then(response => response.json())
    .then(currentSeason => {
      return currentSeason.MRData.RaceTable.Races;
    })
    .catch(err => {
      console.error(err)
    });
  }

  async function fetchNextRace() {
    try {
      const response = await fetch(nextRaceUrl);
      const nextRace = await response.json();
      console.log(nextRace.MRData.RaceTable);
      return nextRace.MRData.RaceTable;
    } catch (error) {
      console.log(error);
    }
  }

  if (isRacesLoading || isNextRaceLoading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    )
  }

  return (
    <ScrollToTop>
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
          {races.map((grandPrix, index) => {
            return (
              <GrandPrix key={grandPrix.Circuit.circuitId} grandPrix={grandPrix} index={index} />
            )
          })}
        </section>
      </div>
      <GoToTopBtn />
    </ScrollToTop>
  )
}