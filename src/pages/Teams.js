import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Team from '../components/Team';
import ScrollToTop from '../components/ScrollToTop';
import GoToTopBtn from '../components/GoToTopBtn';
import './Teams.css';
import { constructorStandingsUrl } from '../globals';

export default function Teams() {
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);

  async function fetchTeams(url) {
    try {
      setLoading(true);
      const response = await fetch(url);
      const teams = await response.json();
      setTeams(teams.MRData.StandingsTable.StandingsLists[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTeams(constructorStandingsUrl);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    )
  }

  return (
    <ScrollToTop>
      <div className="container-sm">
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
      <GoToTopBtn />
    </ScrollToTop>
  )
}