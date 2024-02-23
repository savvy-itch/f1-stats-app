import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import ArchiveResultsTable from '../components/ArchiveResultsTable';
import ScrollToTop from '../components/ScrollToTop';
import GoToTopBtn from '../components/GoToTopBtn';
import './Archive.css';

const BASE_URL = 'https://ergast.com/api/f1';
const firstSeason = 2004; // the oldest that the API provides
const currentSeason = 2024;
const numOfSeasons = Array.from({ length: currentSeason - firstSeason + 1 }, (k,v) => currentSeason - v);

export default function Archive() {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(currentSeason - 1);
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
      setLoading(true);
      const response = await fetch(url);
      let category = await response.json();
      category = category.MRData;
      setDynamicCategoriesList(category);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  // RESULTS
  async function fetchResults(url) {
    try {
      setLoading(true);
      const response = await fetch(url);
      let results = await response.json();
      setResults(results.MRData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    checkDynamicCategories();
    switch (category) {
      case "races":
        fetchResults(`${BASE_URL}/${year}/${dynamicCategory === 'all'
          ? 'results/1.json'
          : `circuits/${dynamicCategory}/results.json`}`);
        break;
      case "fastest":
        fetchResults(`${BASE_URL}/${year}/fastest/1/results.json`);
        break;
      case "drivers":
        fetchResults(`${BASE_URL}/${year}/${dynamicCategory === 'all'
          ? 'driverStandings.json'
          : `drivers/${dynamicCategory}/results.json`}`);
        break;
      case "teams":
        fetchResults(`${BASE_URL}/${year}/${dynamicCategory === 'all'
          ? 'constructorStandings.json'
          : `constructors/${dynamicCategory}/results.json`}`);
        break;
      default:
        break;
    } 
  }, [year, category, dynamicCategory])

  useEffect(() => {
    setDynamicCategory("all");
  }, [year, category]);

  if (loading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    )
  }

  return (
    <ScrollToTop>
      <div className="archive-body-container">
        <div className="archive-container container-lg">
          <section className="search-field">
            <select name="year-category" id="year-category" value={year} onChange={handleYearChange}>
              {numOfSeasons.map(year => {
                return <option key={year} value={year}>{year}</option> 
              })}
            </select>
            <select name="type-category" id="type-category" value={category} onChange={handleCategoryChange}>
              <option value="races">Races</option>
              <option value="drivers">Drivers</option>
              <option value="teams">Teams</option>
              <option value="fastest">Fastest Laps</option>
            </select>
            {/* no dynamic categories for fastest laps */}
            <select name="dynamic-category" id="dynamic-category" value={dynamicCategory} onChange={handleDynamicCategoryChange}>
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
      <GoToTopBtn />
    </ScrollToTop>
  )
}