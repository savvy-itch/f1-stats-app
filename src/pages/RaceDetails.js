import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
import RaceResultsTable from '../components/RaceResultsTable';
import QualificationResultsTable from '../components/QualificationResultsTable';
import SprintResultsTable from '../components/SprintResultsTable';
import Podium from '../components/Podium';
import Timer from '../components/Timer';
import ScrollToTop from '../components/ScrollToTop';
import GoToTopBtn from '../components/GoToTopBtn';
import './RaceDetails.css';
import { currentResultsUrl } from '../globals';

const raceResultsURL = 'https://ergast.com/api/f1/current/circuits/';
const qualifyingResultsURL = 'https://ergast.com/api/f1/current/circuits/';
const sprintResultsURL = 'https://ergast.com/api/f1/current/circuits/';

async function fetchResults(url) {
  try {
    const response = await fetch(url);
    let results = await response.json();
    results = results.MRData.RaceTable;
    return results;
  } catch (error) {
    console.log(error);
  }
}

export default function RaceDetails() {
  const {id, round} = useParams();

  const {data: raceResults, isLoading: isRaceResultsLoading } = useQuery({
    queryKey: ['raceResults'],
    queryFn: () => fetchResults(`${raceResultsURL}${id}/results.json`)
  });
  const {data: qualiResults, isLoading: isQualiResultsLoading } = useQuery({
    queryKey: ['qualiResults'],
    queryFn: () => fetchResults(`${qualifyingResultsURL}${id}/qualifying.json`),
  });
  const {data: sprintResults, isLoading: isSprintResultsLoading } = useQuery({
    queryKey: ['sprintResults'],
    queryFn: () => fetchResults(`${sprintResultsURL}${id}/sprint.json`),
  });
  const {data: totalResults, isLoading: isTotalResultsLoading } = useQuery({
    queryKey: ['totalResults'],
    queryFn: () => fetchResults(`${currentResultsUrl}/${round}.json`),
  });

  function getFormattedMonth(date) {
    let formattedMonth = new Date(date).toLocaleDateString('en-US', { month: 'short'});
    return formattedMonth;
  }

  if (isRaceResultsLoading || isQualiResultsLoading || isSprintResultsLoading || isTotalResultsLoading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    )
  }

  return (
    <ScrollToTop>
      <div>
        <div className="results-header" style={{backgroundImage: `url(images/headers/${raceResults.circuitId}_header.png)`}}>
        {totalResults.Races && totalResults.Races.length > 0 &&
          <div className="results-header-title">
            <p className="header-country">{totalResults.Races[0].Circuit.Location.country}</p>
            <p className="header-season-year">{totalResults.season}</p>
            <p className="header-dates">
              {totalResults.Races[0].FirstPractice.date.substring(8,)} {getFormattedMonth(totalResults.Races[0].FirstPractice.date)} - {totalResults.Races[0].date.substring(8,)} {getFormattedMonth(totalResults.Races[0].date)}
            </p>
          </div>
        }
        </div>
        <section className="container-lg race-details-container">
          <div>
            {raceResults.Races && raceResults.Races.length > 0 &&
              <Podium raceResults={raceResults} />
            }
            {totalResults.Races && totalResults.Races.length > 0 && raceResults.Races && raceResults.Races.length < 1 &&
              <Timer allResults={totalResults} />
            }
          </div>
          <h1 className="race-results-heading">RACE WEEKEND</h1>
          {totalResults.Races && totalResults.Races.length > 0 && 
            <h3>FORMULA 1 {totalResults.Races[0].raceName} {totalResults.Races[0].season}</h3>
          }
          <div>
            <div className="results-container">
              <RaceResultsTable 
                results={raceResults}
                schedule={totalResults}
                getFormattedMonth={getFormattedMonth}
              />
              {totalResults.Races && totalResults.Races[0].Sprint &&
                <SprintResultsTable 
                  results={sprintResults}
                  schedule={totalResults}
                  getFormattedMonth={getFormattedMonth} 
                />
              }
              <QualificationResultsTable 
                results={qualiResults}
                schedule={totalResults}
                getFormattedMonth={getFormattedMonth} 
              />
            </div>
            <div className="circuit-image-wrapper">
              <img src={`images/circuits/${raceResults.circuitId}.png`} alt={raceResults.circuitId} />
              {totalResults.Races && totalResults.Races.length > 0 &&
                <p>{totalResults.Races[0].Circuit.circuitName}</p>
              }
            </div>
          </div>
          <div className="details-info">
            {totalResults.Races && totalResults.Races.length > 0 &&
              <p>Get up to speed with everything you need to know about the {totalResults.Races[0].season} {totalResults.Races[0].raceName}</p>
            }
            <p>Using the links above you can find the full weekend schedule, including details of practice and qualifying sessions, support races, press conferences and special events, plus the latest news headlines, circuit information and F1 race results.</p>
          </div>
        </section>
      </div>
      <GoToTopBtn />
    </ScrollToTop>
  )
}