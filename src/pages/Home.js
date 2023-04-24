import React, {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import DriverStandingsTab from '../components/DriverStandingsTab';
import ConstructorStandingsTab from '../components/ConstructorStandingsTab';
import LastRaceTab from '../components/LastRaceTab';
import GoToTopBtn from '../components/GoToTopBtn';
import { news } from '../news';
import './Home.css';

const DRIVERS_URL = 'https://ergast.com/api/f1/current/driverStandings.json?limit=10';
const CONSTRUCTORS_URL = 'https://ergast.com/api/f1/current/constructorStandings.json';
const LAST_RACE_URL = 'https://ergast.com/api/f1/current/last/results.json?limit=10';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('drivers');
  const [results, setResults] = useState([]);

  async function fetchResults(url) {
    try {
      setLoading(true);
      const response = await fetch(url);
      let results = await response.json();
      results = results.MRData;
      setResults(results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  function handleTabClick(e) {
    if (e.currentTarget.value === 'drivers') {
      fetchResults(DRIVERS_URL);
      setSelectedTab(e.currentTarget.value);
    } else if (e.currentTarget.value === 'constructors') {
      fetchResults(CONSTRUCTORS_URL);
      setSelectedTab(e.currentTarget.value);
    } else if (e.currentTarget.value === 'last-race') {
      fetchResults(LAST_RACE_URL);
      setSelectedTab(e.currentTarget.value);
    }
  }

  useEffect(() => {
    fetchResults(DRIVERS_URL);
  }, [])

  if (loading) {
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
            })}
          </div>
        </div>
      </div>
      <div className="tab-list">
        <button className={`tab ${selectedTab === 'drivers' ? 'active-tab': ''}`} value="drivers" onClick={handleTabClick}><p>Drivers</p></button>
        <button className={`tab ${selectedTab === 'constructors' ? 'active-tab': ''}`} value="constructors" onClick={handleTabClick}><p>Constructors</p></button>
        <button className={`tab ${selectedTab === 'last-race' ? 'active-tab': ''}`} value="last-race" onClick={handleTabClick}><p>Last Race</p></button>
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