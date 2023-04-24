import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import ScrollToTop from '../components/ScrollToTop';
import GoToTopBtn from '../components/GoToTopBtn';
import './TeamDetails.css';

const TEAM_DRIVERS_URL = 'https://ergast.com/api/f1/current/constructors/';
const TEAM_INFO_URL = 'https://v1.formula-1.api-sports.io/teams?search';
const headers = {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-formula-1.p.rapidapi.com",
		"x-apisports-key": "51482715129beb99b4d1186651ad73a8"
  }
}

export default function TeamDetails() {
  const [loading, setLoading] = useState(false);
  const { id, name } = useParams();
  const [teamInfo, setTeamInfo] = useState();
  const [teamDrivers, setTeamDrivers] = useState([]);

  async function fetchTeamInfo(url) {
    try {
      setLoading(true);
      const response = await fetch(url, headers);
      const teamInfo = await response.json();
      setTeamInfo(teamInfo.response[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function fetchTeamDrivers(url) {
    try {
      setLoading(true);
      const response = await fetch(url);
      const teamDrivers = await response.json();
      setTeamDrivers(teamDrivers.MRData.DriverTable.Drivers);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  // id added as a dependency for navbar links to work
  useEffect(() => {
    fetchTeamInfo(`${TEAM_INFO_URL}=${name}`);
    fetchTeamDrivers(`${TEAM_DRIVERS_URL}${id}/drivers.json`);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    )
  }

  return (
    <ScrollToTop>
      <div className="team-body-container">
        <div className="container-lg">
          {teamInfo && Object.keys(teamInfo).length > 0 &&
          <h1>{teamInfo.name}</h1>
          }
          <section className="team-info-container">
            <div className="team-info">
              <div className="team-info-logo">
                <img src={`/images/teams/${name}_logo_lg.jpg`} alt={name} />
              </div>
              {teamInfo && Object.keys(teamInfo).length > 0 &&
              <div className="team-info-stats">
                <div className="team-info-parameter">
                  <p>Team</p>
                  <p>{teamInfo.name}</p>
                </div>
                <div className="team-info-parameter">
                  <p>Base</p>
                  <p>{teamInfo.base}</p>
                </div>
                <div className="team-info-parameter">
                  <p>Team Chief</p>
                  <p>{teamInfo.director}</p>
                </div>
                <div className="team-info-parameter">
                  <p>Technical Chief</p>
                  <p>{teamInfo.technical_manager}</p>
                </div>
                <div className="team-info-parameter">
                  <p>Chassis</p>
                  <p>{teamInfo.chassis}</p>
                </div>
                <div className="team-info-parameter">
                  <p>Power Unit</p>
                  <p>{teamInfo.engine}</p>
                </div>
                <div className="team-info-parameter">
                  <p>First Team Entry</p>
                  <p>{teamInfo.first_team_entry}</p>
                </div>
                <div className="team-info-parameter">
                  <p>World Championships</p>
                  <p>{teamInfo.world_championships}</p>
                </div>
                <div className="team-info-parameter">
                  <p>Highest Race Finish</p>
                  <p>{teamInfo.highest_race_finish.position}(x{teamInfo.highest_race_finish.number})</p>
                </div>
                <div className="team-info-parameter">
                  <p>Pole Positions</p>
                  <p>{teamInfo.pole_positions}</p>
                </div>
                <div className="team-info-parameter">
                  <p>Fastest Laps</p>
                  <p>{teamInfo.fastest_laps}</p>
                </div>
              </div>
              }
            </div>
            {teamDrivers && teamDrivers.length > 0 &&
            <div className="team-drivers-links-div">
              <div className="single-driver-div">
              <Link to={`/drivers/${teamDrivers[0].driverId}`}>
                <div className="single-driver-avatar-wrapper">
                  <img src={`/images/drivers/${teamDrivers[0].code}.jpg`} alt={teamDrivers[0].driverId} />
                </div>
                <div className="single-driver-name">
                  <p>{teamDrivers[0].permanentNumber}</p>
                  <p>{teamDrivers[0].givenName} {teamDrivers[0].familyName}</p>
                  {teamInfo && Object.keys(teamInfo).length > 0 &&
                  <span>{teamInfo.name}</span>
                  }
                </div>
              </Link>
              </div>
              <div className="single-driver-div">
              <Link to={`/drivers/${teamDrivers[1].driverId}`}>
                <div className="single-driver-avatar-wrapper">
                  <img src={`/images/drivers/${teamDrivers[1].code}.jpg`} alt={teamDrivers[1].driverId} />
                </div>
                <div className="single-driver-name">
                  <p>{teamDrivers[1].permanentNumber}</p>
                  <p>{teamDrivers[1].givenName} {teamDrivers[1].familyName}</p>
                  {teamInfo && Object.keys(teamInfo).length > 0 &&
                  <span>{teamInfo.name}</span>
                  }
                </div>
              </Link>
              </div>
            </div>
            }
          </section>
        </div>
      </div>
      <GoToTopBtn />
    </ScrollToTop>
  )
}