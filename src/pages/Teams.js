import React from 'react';
import Loading from '../components/Loading';
import Team from '../components/Team';
import ScrollToTop from '../components/ScrollToTop';
import GoToTopBtn from '../components/GoToTopBtn';
import './Teams.css';
import { constructorStandingsUrl } from '../globals';
import { useQuery } from '@tanstack/react-query';

async function fetchTeams(url) {
  try {
    const response = await fetch(url);
    const teams = await response.json();
    return teams.MRData.StandingsTable.StandingsLists[0];
  } catch (error) {
    console.log(error);
  }
}

export default function Teams() {
  const { data: teams, isLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: () => fetchTeams(constructorStandingsUrl)
  })

  if (isLoading) {
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