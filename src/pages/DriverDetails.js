import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { driversSublinks } from '../navbarContent';
import ScrollToTop from '../components/ScrollToTop';
import GoToTopBtn from '../components/GoToTopBtn';
import './DriverDetails.css';

const driverURL = 'https://v1.formula-1.api-sports.io/drivers?search';
const headers = {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-formula-1.p.rapidapi.com",
		"x-apisports-key": "51482715129beb99b4d1186651ad73a8"
  }
}

export default function DriverDetails() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [driverInfo, setDriverInfo] = useState({});

  let modifiedId = id;
  // convert non-alphabetic ids for valid search results
  if (/[_]/.test(id)) {
    modifiedId = id.split('_').join(' ');
  }

  async function fetchDriverInfo(url) {
    try {
      setLoading(true);
      const response = await fetch(`${url}=${modifiedId}`, headers);
      const driver = await response.json();
      setDriverInfo(driver);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  // TEMPORARY FIX:
  // abbr property has missing values in API response. Change to other properties
  let imgSrc = '';
  if (Object.keys(driverInfo).length > 0 && driverInfo.response.length > 0) {
    switch (id) {
      case 'zhou':
        imgSrc = 'images/drivers/ZHO.jpg';
        break;
      case 'piastri':
        imgSrc = 'images/drivers/PIA.jpg';
        break;
      case 'sargeant':
        imgSrc = 'images/drivers/SAR.jpg';
        break;
      case 'de_vries':
        imgSrc = 'images/drivers/DEV.jpg';
        break;
      default:
        imgSrc = `images/drivers/${driverInfo.response[0].abbr}.jpg`;
    }
  }

  // id added as a dependency for navbar links to work
  useEffect(() => {
    fetchDriverInfo(driverURL);
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
      <div className="drivers-body-container">
        <section className="container-lg">
          <div className="driver-info-container">
            <div className="driver-image">
              <div className="driver-image-wrapper">
                <img src={imgSrc} alt={driverInfo.response?.[0]?.name} />
              </div>
              {Object.keys(driverInfo).length > 0 && driverInfo.response.length > 0 &&
              <div>
                <p className="driver-number">{driverInfo.response[0].number}</p>
                <p className="driver-name">{driverInfo.response[0].name}</p>
              </div>
              }
            </div>
            {Object.keys(driverInfo).length > 0 && driverInfo.response && driverInfo.response.length > 0 &&
            <div className="driver-info">
              <div className="driver-info-parameter">
                <p>Team</p>
                <p>{driverInfo.response[0].teams[0].team.name}</p>
              </div>
              <div className="driver-info-parameter">
                <p>Country</p>
                <p>{driverInfo.response[0].country.name}</p>
              </div>
              <div className="driver-info-parameter">
                <p>Podiums</p>
                <p>{driverInfo.response[0].podiums}</p>
              </div>
              <div className="driver-info-parameter">
                <p>Points</p>
                <p>{driverInfo.response[0].career_points}</p>
              </div>
              <div className="driver-info-parameter">
                <p>Grands Prix entered</p>
                <p>{driverInfo.response[0].grands_prix_entered}</p>
              </div>
              <div className="driver-info-parameter">
                <p>World Championships</p>
                <p>{driverInfo.response[0].world_championships}</p>
              </div>
              <div className="driver-info-parameter">
                <p>Highest race finish</p>
                <p>{driverInfo.response[0].highest_race_finish.position}(x{driverInfo.response[0].highest_race_finish.number})</p>
              </div>
              <div className="driver-info-parameter">
                <p>Highest grid position</p>
                <p>{driverInfo.response[0].highest_grid_position}</p>
              </div>
              <div className="driver-info-parameter">
                <p>Date of birth</p>
                <p>{driverInfo.response[0].birthdate}</p>
              </div>
              <div className="driver-info-parameter">
                <p>Place of birth</p>
                <p>{driverInfo.response[0].birthplace}</p>
              </div>
            </div>
            }
          </div>
          <div className="driver-bio">
            <h2>Biography</h2>
            {driversSublinks.find(d => d.id === id).bio.map((para, index) => {
              return <p key={index}>{para}</p>
            })}
          </div>
        </section>
      </div>
      <GoToTopBtn />
    </ScrollToTop>
  )
}