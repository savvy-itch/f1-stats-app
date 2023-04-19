import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import RaceResultsTable from '../components/RaceResultsTable';
import QualificationResultsTable from '../components/QualificationResultsTable';
import SprintResultsTable from '../components/SprintResultsTable';
import Podium from '../components/Podium';
import Timer from '../components/Timer';
import './RaceDetails.css';

const raceResultsURL = 'https://ergast.com/api/f1/current/circuits/';
const qualifyingResultsURL = 'https://ergast.com/api/f1/current/circuits/';
const sprintResultsURL = 'http://ergast.com/api/f1/current/circuits/';
const resultsURL = 'https://ergast.com/api/f1/current/';

export default function RaceDetails() {
  const {id, round} = useParams();
  const [loading, setLoading] = useState(false);
  const [raceResults, setRaceResults] = useState({});
  const [qualificationResults, setQualificationResults] = useState({});
  const [sprintResults, setSprintResults] = useState({});
  const [allResults, setAllResults] = useState({});

  async function fetchResults(url, setFunction) {
    try {
      const response = await fetch(url);
      let results = await response.json();
      results = results.MRData.RaceTable;
      setFunction(results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchResults(`${raceResultsURL}${id}/results.json`, setRaceResults);
    fetchResults(`${qualifyingResultsURL}${id}/qualifying.json`, setQualificationResults);
    fetchResults(`${sprintResultsURL}${id}/sprint.json`, setSprintResults);
    fetchResults(`${resultsURL}${round}.json`, setAllResults);
    setLoading(false);
  }, []);

  function getFormattedMonth(date) {
    let formattedMonth = new Date(date).toLocaleDateString('en-US', { month: 'short'});
    return formattedMonth;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    )
  }

  return (
    <div>
      <div className="results-header" style={{backgroundImage: `url(images/headers/${raceResults.circuitId}_header.png)`}}>
      {allResults.Races && allResults.Races.length > 0 &&
        <div className="results-header-title">
          <p className="header-country">{allResults.Races[0].Circuit.Location.country}</p>
          <p className="header-season-year">{allResults.season}</p>
          <p className="header-dates">
            {allResults.Races[0].FirstPractice.date.substring(8,)} {getFormattedMonth(allResults.Races[0].FirstPractice.date)} - {allResults.Races[0].date.substring(8,)} {getFormattedMonth(allResults.Races[0].date)}
          </p>
        </div>
      }
      </div>
      <section className="container">
        <div>
          {raceResults.Races && raceResults.Races.length > 0 &&
            <Podium raceResults={raceResults} />
          }
          {allResults.Races && allResults.Races.length > 0 && raceResults.Races && raceResults.Races.length < 1 &&
            <Timer allResults={allResults} />
          }
        </div>
        <h1 className="race-results-heading">RACE WEEKEND</h1>
        {allResults.Races && allResults.Races.length > 0 && 
          <h3>FORMULA 1 {allResults.Races[0].raceName} {allResults.Races[0].season}</h3>
        }
        <div>
          <div className="results-container">
            <RaceResultsTable 
              results={raceResults}
              schedule={allResults}
              getFormattedMonth={getFormattedMonth}
            />
            {allResults.Races && allResults.Races[0].Sprint &&
              <SprintResultsTable 
                results={sprintResults}
                schedule={allResults}
                getFormattedMonth={getFormattedMonth} 
              />
            }
            <QualificationResultsTable 
              results={qualificationResults}
              schedule={allResults}
              getFormattedMonth={getFormattedMonth} 
            />
          </div>
          <div className="circuit-image-wrapper">
            <img src={`images/circuits/${raceResults.circuitId}.png`} alt={raceResults.circuitId} />
            {allResults.Races && allResults.Races.length > 0 &&
              <p>{allResults.Races[0].Circuit.circuitName}</p>
            }
          </div>
        </div>
        <div className="details-info">
          {allResults.Races && allResults.Races.length > 0 &&
            <p>Get up to speed with everything you need to know about the {allResults.Races[0].season} {allResults.Races[0].raceName}</p>
          }
          <p>Using the links above you can find the full weekend schedule, including details of practice and qualifying sessions, support races, press conferences and special events, plus the latest news headlines, circuit information and F1 race results.</p>
        </div>
      </section>
    </div>
  )
}