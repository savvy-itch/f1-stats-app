import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RaceResultsTable from '../components/RaceResultsTable';
import QualificationResultsTable from '../components/QualificationResultsTable';
import SprintResultsTable from '../components/SprintResultsTable';
import Timer from '../components/Timer';
import './RaceDetails.css';

const raceResultsURL = 'https://ergast.com/api/f1/current/circuits/';
const qualifyingResultsURL = 'https://ergast.com/api/f1/current/circuits/';
const sprintResultsURL = 'http://ergast.com/api/f1/current/circuits/';

const resultsURL = 'https://ergast.com/api/f1/current/';

// test url for sprint = 'https://ergast.com/api/f1/2021/10/sprint.json'
// https://ergast.com/api/f1/current/5.json

export default function RaceDetails() {
  const {id, round} = useParams();
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
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchResults(`${raceResultsURL}${id}/results.json`, setRaceResults);
    // console.log(`${raceResultsURL}${id}/results.json`);
    fetchResults(`${qualifyingResultsURL}${id}/qualifying.json`, setQualificationResults);
    // console.log(`${qualifyingResultsURL}${id}/qualifying.json`);
    // fetchResults('https://ergast.com/api/f1/2021/10/sprint.json', setSprintResults);
    fetchResults(`${sprintResultsURL}${id}/sprint.json`, setSprintResults);
    // console.log(`${sprintResultsURL}${id}/sprint.json`);
    fetchResults(`${resultsURL}${round}.json`, setAllResults);
    // console.log(`${resultsURL}${round}.json`)
  }, []);

  function getFormattedMonth(date) {
    let formattedMonth = new Date(date);
    const monthOptions = { month: 'short' };
    formattedMonth = formattedMonth.toLocaleDateString('en-US', monthOptions);
    return formattedMonth;
  }

  return (
    <div>
      <div className="results-header" style={{backgroundImage: `url(images/headers/${raceResults.circuitId}_header.png)`}}>
      {allResults.Races && allResults.Races.length > 0 &&
        <div className="results-header-title">
          <p className="header-country">{allResults.Races[0].Circuit.Location.country}</p>
          <p>{allResults.season}</p>
          <p className="header-dates">
            {allResults.Races[0].FirstPractice.date.substring(8,)} {getFormattedMonth(allResults.Races[0].FirstPractice.date)} - {allResults.Races[0].date.substring(8,)} {getFormattedMonth(allResults.Races[0].date)}
          </p>
        </div>
      }
      </div>
      <section className="container">
        <div>
          {raceResults.Races && raceResults.Races.length &&
            <div className="podium-container">
              <div className="podium-winner">
                <strong style={{color: `var(--${raceResults.Races[0].Results[0].Constructor.constructorId}_color)`}}>1</strong>
                <p>{raceResults.Races[0].Results[0].Driver.givenName} <strong>{raceResults.Races[0].Results[0].Driver.familyName}</strong></p>
                <p>{raceResults.Races[0].Results[0].Time.time}</p>
              </div>
              <div className="podium-winner">
                <strong style={{color: `var(--${raceResults.Races[0].Results[1].Constructor.constructorId}_color)`}}>2</strong>
                <p>{raceResults.Races[0].Results[1].Driver.givenName} <strong>{raceResults.Races[0].Results[1].Driver.familyName}</strong></p>
                <p>{raceResults.Races[0].Results[1].Time.time}</p>
              </div>
              <div className="podium-winner">
                <strong style={{color: `var(--${raceResults.Races[0].Results[2].Constructor.constructorId}_color)`}}>3</strong>
                <p>{raceResults.Races[0].Results[2].Driver.givenName} <strong>{raceResults.Races[0].Results[2].Driver.familyName}</strong></p>
                <p>{raceResults.Races[0].Results[2].Time.time}</p>
              </div>
            </div>
          }
          {allResults.Races && allResults.Races.length > 0 &&
            <Timer allResults={allResults} />
          }
        </div>
        <h1>RACE WEEKEND</h1>
        {allResults.Races && allResults.Races.length > 0 &&
          <h3>FORMULA 1 {allResults.Races[0].raceName} {allResults.Races[0].season}</h3>
        }
        <div>
          <div className="results-container">
            <RaceResultsTable 
              results={raceResults}
              getFormattedMonth={getFormattedMonth}
            />
            <QualificationResultsTable 
              results={qualificationResults}
              getFormattedMonth={getFormattedMonth} 
            />
            {sprintResults.Races && sprintResults.Races.length > 0 &&
              <SprintResultsTable 
                results={sprintResults}
                getFormattedMonth={getFormattedMonth} 
              />
            }
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