import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

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
      const response = await fetch(`${url}=${name} ${surname}`, headers);
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
    <div>
      <p>Team</p>
      <p>Nationality</p>
      <p>Grands Prix entered</p>
      <p>World Championships</p>
      <p>Date of birth</p>
    </div>
  )
}
