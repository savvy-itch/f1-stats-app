import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RaceResultsTable from '../components/RaceResultsTable';
import QualificationResultsTable from '../components/QualificationResultsTable';
import SprintResultsTable from '../components/SprintResultsTable';
import './RaceDetails.css';

const raceResultsURL = 'https://ergast.com/api/f1/current/circuits/';
const qualifyingResultsURL = 'https://ergast.com/api/f1/current/circuits/';
const sprintResultsURL = 'http://ergast.com/api/f1/current/circuits/';

export default function RaceDetails() {
  const {id} = useParams();
  const [raceResults, setRaceResults] = useState({});
  const [qualificationResults, setQualificationResults] = useState({});
  const [sprintResults, setSprintResults] = useState({});

  async function fetchResults(url, setFunction) {
    try {
      const response = await fetch(url);
      let results = await response.json();
      results = results.MRData.RaceTable.Races[0];
      setFunction(results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchResults(`${raceResultsURL}${id}/results.json`, setRaceResults);
    fetchResults(`${qualifyingResultsURL}${id}/qualifying.json`, setQualificationResults);
    fetchResults('https://ergast.com/api/f1/2021/10/sprint.json', setSprintResults);
  }, []);

  return (
    <section className="container">
      <h1>RACE WEEKEND</h1>
      <h3>FORMULA 1 STC SAUDI ARABIAN GRAND PRIX 2023</h3>
      <div className="results-container">
        <QualificationResultsTable results={qualificationResults} />
        <RaceResultsTable results={raceResults} />
        <SprintResultsTable results={sprintResults} />
      </div>
    </section>
  )
}