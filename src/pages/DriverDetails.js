import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './DriverDetails.css';

// http://ergast.com/api/f1/current/drivers/alonso/driverStandings.json
// http://ergast.com/api/f1/drivers/alonso/results/1.json

const driverURL = 'https://v1.formula-1.api-sports.io/drivers?search';
const headers = {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-formula-1.p.rapidapi.com",
		"x-apisports-key": "51482715129beb99b4d1186651ad73a8"
  }
}
// https://v1.formula-1.api-sports.io/drivers?search=alonso
// 51482715129beb99b4d1186651ad73a8
// https://v1.formula-1.api-sports.io/drivers


export default function DriverDetails() {
  const { id, name, surname } = useParams();
  const [driverInfo, setDriverInfo] = useState({});

  async function fetchDriverInfo(url) {
    try {
      const response = await fetch(`${url}=${id}`, headers);
      const driver = await response.json();
      setDriverInfo(driver);
      console.log(driver);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDriverInfo(driverURL);
  }, []);

  return (
    <section className="drivers-container">
      {Object.keys(driverInfo).length > 0 &&
      <div className="driver-info-container">
        <div className="driver-image">
          <div className="driver-image-wrapper">
            <img src={`images/drivers/${driverInfo.response[0].abbr}.jpg`} alt={driverInfo.response[0].name} />
          </div>
          <div>
            {/* <p className="driver-number">1</p> */}
            <p>{driverInfo.response[0].number}</p>
            <p>{driverInfo.response[0].name}</p>
            {/* <p className="driver-name">Max Verstappen</p> */}
          </div>
        </div>
        <div className="driver-info">
          <div>
            <p>Team</p>
            <p>Country</p>
            <p>Podiums</p>
            <p>Points</p>
            <p>Grands Prix entered</p>
            <p>World Championships</p>
            <p>Highest race finish</p>
            <p>Highest grid position</p>
            <p>Date of birth</p>
            <p>Place of birth</p>
          </div>
          {/* <div>
            <p>Team</p>
            <p>Country</p>
            <p>Podiums</p>
            <p>Points</p>
            <p>Grands Prix entered</p>
            <p>World Championships</p>
            <p>Highest race finish</p>
            <p>Highest grid position</p>
            <p>Date of birth</p>
            <p>Place of birth</p>
          </div> */}
            <div>
              <p>{driverInfo.response[0].teams[0].team.name}</p>
              <p>{driverInfo.response[0].country.name}</p>
              <p>{driverInfo.response[0].podiums}</p>
              <p>{driverInfo.response[0].career_points}</p>
              <p>{driverInfo.response[0].grands_prix_entered}</p>
              <p>{driverInfo.response[0].world_championships}</p>
              <p>{driverInfo.response[0].highest_race_finish.position}(x{driverInfo.response[0].highest_race_finish.number})</p>
              <p>{driverInfo.response[0].highest_grid_position}</p>
              <p>{driverInfo.response[0].birthdate}</p>
              <p>{driverInfo.response[0].birthplace}</p>
            </div>
        </div>
      </div>
      }
      <h2>You Might Also Like</h2>

    </section>
  )
}
