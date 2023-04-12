import React, { useState, useEffect } from 'react';
import Team from '../components/Team';
import './Teams.css';

const TEAMS_URL = 'https://ergast.com/api/f1/current/constructorStandings.json';

// All teams with points and wins: https://ergast.com/api/f1/current/constructorStandings.json

// single team with drivers: https://ergast.com/api/f1/current/constructors/mclaren/results.json

export default function Teams() {
  const [teams, setTeams] = useState([]);

  async function fetchTeams(url) {
    try {
      const response = await fetch(url);
      const teams = await response.json();
      setTeams(teams.MRData.StandingsTable.StandingsLists[0]);
      console.log(teams.MRData.StandingsTable.StandingsLists[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTeams(TEAMS_URL);
  }, []);

  return (
    <div className="teams-container">
      <div className="teams-heading">
        <h1>F1 Teams 2023</h1>
      </div>
      <div className="teams-desc">
      Discover everything you need to know about this year's Formula 1 teams - drivers, podium finishes, points earned and championship titles.
      </div>
      <div className="teams-grid">
      {teams.ConstructorStandings && teams.ConstructorStandings.map(c => {
        return <Team constructor={c} key={c.Constructor.constructorId} />
      })}
      </div>
    </div>
  )
}
