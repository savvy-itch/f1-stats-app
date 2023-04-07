import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RaceResultsTable from '../components/RaceResultsTable';
import QualificationResultsTable from '../components/QualificationResultsTable';
import SprintResultsTable from '../components/SprintResultsTable';
import './RaceDetails.css';

const raceResultsURL = 'https://ergast.com/api/f1/current/circuits/';
const qualifyingResultsURL = 'https://ergast.com/api/f1/current/circuits/';
const sprintResultsURL = 'http://ergast.com/api/f1/current/circuits/';

// test url for sprint = 'https://ergast.com/api/f1/2021/10/sprint.json'

export default function RaceDetails() {
  const {id} = useParams();
  const [raceResults, setRaceResults] = useState({});
  const [qualificationResults, setQualificationResults] = useState({});
  const [sprintResults, setSprintResults] = useState({});

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
    console.log(`${raceResultsURL}${id}/results.json`);
    fetchResults(`${qualifyingResultsURL}${id}/qualifying.json`, setQualificationResults);
    console.log(`${qualifyingResultsURL}${id}/qualifying.json`);
    // fetchResults('https://ergast.com/api/f1/2021/10/sprint.json', setSprintResults);
    fetchResults(`${sprintResultsURL}${id}/sprint.json`, setSprintResults);
    console.log(`${sprintResultsURL}${id}/sprint.json`);
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
        {raceResults.circuitId}
      </div>
      <section className="container">
        <h1>RACE WEEKEND</h1>
        <h3>FORMULA 1 STC SAUDI ARABIAN GRAND PRIX 2023</h3>
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
            <p>Circuit layout</p>
          </div>
        </div>
        <div className="details-info">
          <p>Get up to speed with everything you need to know about the 2023 Australian Grand Prix</p>
          <p>Using the links above you can find the full weekend schedule, including details of practice and qualifying sessions, support races, press conferences and special events, plus the latest news headlines, circuit information and F1 race results.</p>
        </div>
      </section>
    </div>
  )
}