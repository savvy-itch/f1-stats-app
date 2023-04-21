import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import DriverStandingsTab from '../components/DriverStandingsTab';
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
            <h2>Wolff says W14 pace is 'only the tip of the iceberg' as Mercedes upgrades imminent</h2>
            <div className="main-news-thumbnail">
              <img src="/images/news/news_thumbnail.png" alt="" />
            </div>
          </div>

          <div className="other-news">
            <div className="news-div">
              <div className="news-thumbnail">
                <img src="/images/news/news1_thumbnail.png" alt="" />
              </div>
              <div className="news-heading">
                <span className="news-tag">news</span>
                <p>McLaren form new driver development programme led by ex-driver Emanuele Pirro</p>
              </div>
            </div>
            <div className="news-div">
              <div className="news-thumbnail">
                <img src="/images/news/news1_thumbnail.png" alt="" />
              </div>
              <div className="news-heading">
                <span className="news-tag">news</span>
                <p>McLaren form new driver development programme led by ex-driver Emanuele Pirro</p>
              </div>
            </div>
            <div className="news-div">
              <div className="news-thumbnail">
                <img src="/images/news/news1_thumbnail.png" alt="" />
              </div>
              <div className="news-heading">
                <span className="news-tag">news</span>
                <p>McLaren form new driver development programme led by ex-driver Emanuele Pirro</p>
              </div>
            </div>
            <div className="news-div">
              <div className="news-thumbnail">
                <img src="/images/news/news1_thumbnail.png" alt="" />
              </div>
              <div className="news-heading">
                <span className="news-tag">news</span>
                <p>McLaren form new driver development programme led by ex-driver Emanuele Pirro</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="tab-list">
        <button className={`tab ${selectedTab === 'drivers' ? 'active-tab': ''}`} value="drivers" onClick={handleTabClick}><p>Drivers</p></button>
        <button className={`tab ${selectedTab === 'constructors' ? 'active-tab': ''}`} value="constructors" onClick={handleTabClick}><p>Constructors</p></button>
        <button className={`tab ${selectedTab === 'last-race' ? 'active-tab': ''}`} value="last-race" onClick={handleTabClick}><p>Last Race</p></button>
      </div>
      <div className="tab-results">
        {selectedTab === 'drivers' && <DriverStandingsTab results={results} />
        }
        {selectedTab === 'constructors' && results.StandingsTable 
        && results.StandingsTable.StandingsLists[0].ConstructorStandings.map(item => {
          return (
          <div className="tab-results-row" key={item.position}>
            <p>{item.position}</p>
            <p>{item.Constructor.name}</p>
            <p>{item.points}</p>
          </div>)
        })
        }
        {selectedTab === 'last-race' && results.RaceTable 
        && results.RaceTable.Races[0].Results.map(item => {
          return (
          <div className="tab-results-row" key={item.position}>
            <p>{item.position}</p>
            <p>{item.Driver.givenName} {item.Driver.familyName}</p>
            <p>{item.points}</p>
          </div>)
        })
        }
      </div>
    </>
  )
}