import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import './TeamDetails.css';

const TEAM_DRIVERS_URL = 'http://ergast.com/api/f1/current/constructors/';
const TEAM_INFO_URL = 'https://v1.formula-1.api-sports.io/teams?search';
const headers = {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-formula-1.p.rapidapi.com",
		"x-apisports-key": "51482715129beb99b4d1186651ad73a8"
  }
}

export default function TeamDetails() {
  const { id, name } = useParams();
  const [teamInfo, setTeamInfo] = useState();
  const [teamDrivers, setTeamDrivers] = useState([]);

  async function fetchTeamInfo(url) {
    try {
      const response = await fetch(url, headers);
      const teamInfo = await response.json();
      setTeamInfo(teamInfo.response[0]);
      // console.log(teamInfo.response[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTeamDrivers(url) {
    try {
      const response = await fetch(url);
      const teamDrivers = await response.json();
      setTeamDrivers(teamDrivers.MRData.DriverTable.Drivers);
      console.log(teamDrivers.MRData.DriverTable.Drivers);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTeamInfo(`${TEAM_INFO_URL}=${name}`);
    fetchTeamDrivers(`${TEAM_DRIVERS_URL}${id}/drivers.json`);
  }, []);

  return (
    <div className="team-container">
      {teamInfo && Object.keys(teamInfo).length > 0 &&
      <h1>{teamInfo.name}</h1>
      }
      <section className="team-info-container">
        <div className="team-info">
          <div>
            <p>Team</p>
            <p>Base</p>
            <p>Team Chief</p>
            <p>Technical Chief</p>
            <p>Chassis</p>
            <p>Power Unit</p>
            <p>First Team Entry</p>
            <p>World Championships</p>
            <p>Highest Race Finish</p>
            <p>Pole Positions</p>
            <p>Fastest Laps</p>
          </div>
          {teamInfo && Object.keys(teamInfo).length > 0 &&
          <div>
            <p>{teamInfo.name}</p>
            <p>{teamInfo.base}</p>
            <p>{teamInfo.director}</p>
            <p>{teamInfo.technical_manager}</p>
            <p>{teamInfo.chassis}</p>
            <p>{teamInfo.engine}</p>
            <p>{teamInfo.first_team_entry}</p>
            <p>{teamInfo.world_championships}</p>
            <p>{teamInfo.highest_race_finish.position}(x{teamInfo.highest_race_finish.number})</p>
            <p>{teamInfo.pole_positions}</p>
            <p>{teamInfo.fastest_laps}</p>
          </div>
          }
        </div>
        {teamDrivers && teamDrivers.length > 0 &&
        <div className="team-drivers-links-div">
          <div className="single-driver-div">
          <Link to={`/drivers/${teamDrivers[0].driverId}/${teamDrivers[0].givenName}/${teamDrivers[0].familyName}`}>
            <div className="single-driver-avatar-wrapper">
              <img src={`/images/drivers/${teamDrivers[0].code}.jpg`} alt="" />
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
          <Link to={`/drivers/${teamDrivers[1].driverId}/${teamDrivers[1].givenName}/${teamDrivers[1].familyName}`}>
            <div className="single-driver-avatar-wrapper">
              <img src={`/images/drivers/${teamDrivers[1].code}.jpg`} alt="" />
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
      <h2>You Might Also Like</h2>
    </div>
  )
}
