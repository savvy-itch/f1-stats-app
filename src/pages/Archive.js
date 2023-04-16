import React, { useEffect, useState } from 'react';
import ArchiveResultsTable from '../components/ArchiveResultsTable';
import './Archive.css';

const BASE_URL = 'https://ergast.com/api/f1';

export default function Archive() {
  const [year, setYear] = useState('2004');
  const [category, setCategory] = useState('races');
  const [dynamicCategoriesList, setDynamicCategoriesList] = useState([]);
  const [dynamicCategory, setDynamicCategory] = useState('all');
  const [results, setResults] = useState([]);

  // CATEGORIES
  function handleYearChange(e) {
    const selectedYear = e.target.value;
    setYear(selectedYear);
  }

  function handleCategoryChange(e) {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
  }

  function handleDynamicCategoryChange(e) {
    const selectedCategory = e.target.value;
    setDynamicCategory(selectedCategory);
  }

  function checkDynamicCategories() {
    if (category !== 'fastest') {
      switch (category) {
        case 'races':
          fetchDynamicCategories(`${BASE_URL}/${year}.json`);
          break;
        case 'drivers':
          fetchDynamicCategories(`${BASE_URL}/${year}/drivers.json`);
          break;
        case 'teams':
          fetchDynamicCategories(`${BASE_URL}/${year}/constructors.json`);
          break
        default:
          break;
      }
    } else {
      setDynamicCategoriesList([]);
    }
  }

  async function fetchDynamicCategories(url) {
    try {
      const response = await fetch(url);
      let category = await response.json();
      category = category.MRData;
      setDynamicCategoriesList(category);
    } catch (error) {
      console.log(error);
    }
  }

  // RESULTS
  async function fetchResults(url, dynamicCategory) {
    try {
      const response = await fetch(url);
      let results = await response.json();
      setResults(results.MRData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkDynamicCategories();
    switch (category) {
      case "races":
        fetchResults(`${BASE_URL}/${year}/${dynamicCategory === 'all'
          ? 'results/1.json'
          : `circuits/${dynamicCategory}/results.json`}`, dynamicCategory);
        break;
      case "fastest":
        fetchResults(`${BASE_URL}/${year}/fastest/1/results.json`, dynamicCategory);
        break;
      case "drivers":
        fetchResults(`${BASE_URL}/${year}/${dynamicCategory === 'all'
          ? 'driverStandings.json'
          : `drivers/${dynamicCategory}/results.json`}`, dynamicCategory);
        break;
      case "teams":
        fetchResults(`${BASE_URL}/${year}/${dynamicCategory === 'all'
          ? 'constructorStandings.json'
          : `constructors/${dynamicCategory}/results.json`}`, dynamicCategory);
        break;
      default:
        break;
    } 
  }, [year, category, dynamicCategory])

  useEffect(() => {
    setDynamicCategory("all");
  }, [year, category]);


  return (
    <div>
      <div className="archive-container">
        <section className="search-field">
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
          <select name="" id="" value={category} onChange={handleCategoryChange}>
            <option value="races">Races</option>
            <option value="drivers">Drivers</option>
            <option value="teams">Teams</option>
            <option value="fastest">Fastest Laps</option>
          </select>
          {/* no dynamic categories for fastest laps */}
          <select name="" id="" value={dynamicCategory} onChange={handleDynamicCategoryChange}>
          {category === 'fastest' 
            ? null 
            : <option value="all">All</option>
          }
          {dynamicCategoriesList.RaceTable && dynamicCategoriesList.RaceTable.Races.map(dc => {
            return <option 
              key={dc.Circuit.circuitId} 
              value={dc.Circuit.circuitId}>
                {dc.raceName}
              </option>
          })
          }
          {dynamicCategoriesList.DriverTable && dynamicCategoriesList.DriverTable.Drivers.map(dc => {
            return <option 
              key={dc.driverId} 
              value={dc.driverId}>
                {dc.givenName} {dc.familyName}
              </option>
          })
          }
          {dynamicCategoriesList.ConstructorTable && dynamicCategoriesList.ConstructorTable.Constructors.map(dc => {
            return <option 
              key={dc.constructorId} 
              value={dc.constructorId}>
                {dc.name}
              </option>
          })
          }
          </select>
        </section>
      </div>
      {Object.keys(results).length > 0 &&
        <ArchiveResultsTable 
          year={year}
          category={category}
          dynamicCategory={dynamicCategory}
          setDynamicCategory={setDynamicCategory}
          results={results}
        />
      }
    </div>
  )
}