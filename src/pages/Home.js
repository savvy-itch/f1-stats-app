import React, { useState} from 'react';
import Loading from '../components/Loading';
import DriverStandingsTab from '../components/DriverStandingsTab';
import ConstructorStandingsTab from '../components/ConstructorStandingsTab';
import LastRaceTab from '../components/LastRaceTab';
import GoToTopBtn from '../components/GoToTopBtn';
import { news } from '../news';
import './Home.css';
import { constructorStandingsUrl } from '../globals';
import { useQuery } from '@tanstack/react-query';

const DRIVERS_URL = 'https://ergast.com/api/f1/current/driverStandings.json?limit=10';
const LAST_RACE_URL = 'https://ergast.com/api/f1/current/last/results.json?limit=10';

async function fetchResults(url) {
  const response = await fetch(url);
  let results = await response.json();
  return results.MRData;
}

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('drivers');
  const { data: results, isLoading } = useQuery({
    queryKey: [selectedTab],
    queryFn: () => {
      switch(selectedTab) {
        case 'drivers':
          return fetchResults(DRIVERS_URL);
        case 'constructors':
          return fetchResults(constructorStandingsUrl);
        case 'last-race':
          return fetchResults(LAST_RACE_URL);
        default:
          return null;
      }
    }
  })

  if (isLoading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    )
  }

  return (
    <>
      <div className="container-sm">
        <div className="news-container">
          <div className="main-news">
            <span className="news-tag">news</span>
            <h2>{news[0].headline}</h2>
            <div className="main-news-thumbnail">
              <img src={news[0].image} alt="news-thumbnail" />
            </div>
          </div>

          <div className="other-news">
            {news.map((elem, index) => {
              if (index > 0) {
                return (
                <div className="news-div" key={index}>
                  <div className="news-thumbnail">
                    <img src={elem.image} alt="other-news-card" />
                  </div>
                  <div className="news-heading">
                    <span className="news-tag">news</span>
                    <p>{elem.headline}</p>
                  </div>
                </div>)
              }
              return null
            })}
          </div>
        </div>
      </div>
      <div className="tab-list">
        <button className={`tab ${selectedTab === 'drivers' ? 'active-tab': ''}`} value="drivers" onClick={(e) => setSelectedTab(e.currentTarget.value)}><p>Drivers</p></button>
        <button className={`tab ${selectedTab === 'constructors' ? 'active-tab': ''}`} value="constructors" onClick={(e) => setSelectedTab(e.currentTarget.value)}><p>Constructors</p></button>
        <button className={`tab ${selectedTab === 'last-race' ? 'active-tab': ''}`} value="last-race" onClick={(e) => setSelectedTab(e.currentTarget.value)}><p>Last Race</p></button>
      </div>
      <div className="tab-results">
        {selectedTab === 'drivers' && <DriverStandingsTab results={results} />}
        {selectedTab === 'constructors' && <ConstructorStandingsTab results={results} />}
        {selectedTab === 'last-race' && <LastRaceTab results={results} />}
      </div>
      <GoToTopBtn />
    </>
  )
}