import React, { useEffect, useState } from 'react';
import ArchiveResultsTable from '../components/ArchiveResultsTable';

const BASE_URL = 'https://ergast.com/api/f1';
// Race results (gp, date, winner, team, laps, time)
// http://ergast.com/api/f1/2009/results/1.json
// Selected race results (pos, no, driver, team, laps, time, pts)
// http://ergast.com/api/f1/2007/circuits/albert_park/results.json
// Drivers standings (pos, driver, nationality, team, pts)
// http://ergast.com/api/f1/2007/driverStandings.json
// Selected driver results (gp, date, team, pos, pts)
// http://ergast.com/api/f1/2007/drivers/alonso/results.json
// Teams standings (pos, team, pts)
// http://ergast.com/api/f1/2007/constructorStandings.json
// Selected team standings (pos, date, pts)
// Fastest Lap (gp, driver, team, time)
// http://ergast.com/api/f1/2004/fastest/1/results.json


// dynamic category
// races: https://ergast.com/api/f1/2012.json
// drivers: https://ergast.com/api/f1/2010/drivers.json
// teams: http://ergast.com/api/f1/2010/constructors.json

export default function Archive() {
  const [year, setYear] = useState('2004');
  const [category, setCategory] = useState('races');
  const [dynamicCategory, setDynamicCategory] = useState([]);
  const [results, setResults] = useState([]);

  function handleYearChange(e) {
    const selectedYear = e.target.value;
    // console.log(selectedYear);
    setYear(selectedYear);
    // checkDynamicCategories();
  }

  function handleCategoryChange(e) {
    const selectedCategory = e.target.value;
    // console.log(selectedCategory);
    setCategory(selectedCategory);
    // checkDynamicCategories();
  }

  async function fetchResults(url) {
    try {
      const response = await fetch(url);
      let results = await response.json();
      // console.log(results.MRData.RaceTable.Races);
      setResults(results.MRData.RaceTable.Races);
    } catch (error) {
      console.log(error);
    }
  }

  function checkDynamicCategories() {
    if (category !== 'fastest') {
      switch (category) {
        case 'races':
          fetchDynamicCategory(`${BASE_URL}/${year}.json`);
          break;
        case 'drivers':
          fetchDynamicCategory(`${BASE_URL}/${year}/drivers.json`);
          break;
        case 'teams':
          fetchDynamicCategory(`${BASE_URL}/${year}/constructors.json`);
          break
        default:
          break;
      }
    } else {
      setDynamicCategory([]);
    }
  }

  function handleDynamicCategoryChange() {
    setDynamicCategory(null);
  }

  async function fetchDynamicCategory(url) {
    try {
      const response = await fetch(url);
      let category = await response.json();
      category = category.MRData;
      setDynamicCategory(category);
      console.log(category);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkDynamicCategories();
    switch (category) {
      case "races":
        fetchResults(`${BASE_URL}/${year}/results/1.json`);
        break;
      case "fastest":
        fetchResults(`${BASE_URL}/${year}/fastest/1/results.json`);
        break;
      // case "drivers":
      //   fetchResults(`${BASE_URL}/${year}/driverStandings.json`);
      //   break;
      // case "teams":
      //   fetchResults(`${BASE_URL}/${year}/constructorStandings.json`);
      //   break;
      default:
        break;
    } 
  }, [year, category])

  return (
    <div className="archive-container">
      <div>
        <div>
          <select name="" id="" value={year} onChange={handleYearChange}>
            <option value="2004">2004</option>
            <option value="2005">2005</option>
            <option value="2006">2006</option>
            <option value="2007">2007</option>
            <option value="2008">2008</option>
            <option value="2009">2009</option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div>
          <select name="" id="" value={category} onChange={handleCategoryChange}>
            <option value="races">Races</option>
            <option value="drivers">Drivers</option>
            <option value="teams">Teams</option>
            <option value="fastest">Fastest Laps</option>
          </select>
        </div>
        <div>
          {/* no dynamic categories for fastest laps */}
          <select name="" id="" onChange={handleDynamicCategoryChange}>
          {category === 'fastest' 
            ? null 
            : <option value="all">All</option>
          }
          {dynamicCategory.RaceTable && dynamicCategory.RaceTable.Races.map(dc => {
            return <option 
              key={dc.Circuit.circuitId} 
              value={dc.Circuit.circuitId}>
                {dc.raceName}
              </option>
          })
          }
          {dynamicCategory.DriverTable && dynamicCategory.DriverTable.Drivers.map(dc => {
            return <option 
              key={dc.driverId} 
              value={dc.driverId}>
                {dc.givenName} {dc.familyName}
              </option>
          })
          }
          {dynamicCategory.ConstructorTable && dynamicCategory.ConstructorTable.Constructors.map(dc => {
            return <option 
              key={dc.constructorId} 
              value={dc.constructorId}>
                {dc.name}
              </option>
          })
          }
          </select>
        </div>
      </div>
      {/* <ArchiveResultsTable results={results} /> */}
    </div>
  )
}