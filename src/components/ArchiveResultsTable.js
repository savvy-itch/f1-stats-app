import React, { useState, useEffect } from 'react';

export default function ArchiveResultsTable({ year, category, dynamicCategory, setDynamicCategory, results }) {
  const [currentResults, setCurrentResults] = useState([]);

  useEffect(() => {
    if (category === 'races' && dynamicCategory === 'all' && results.RaceTable && Object.keys(results.RaceTable).length > 0 && results.RaceTable.Races.length > 0) {
      setCurrentResults(results.RaceTable.Races);
    } else if (category === 'races' && dynamicCategory !== 'all') {
      setCurrentResults(results.RaceTable.Races[0].Results);
    } else if (category === 'drivers' && dynamicCategory === 'all' && results.StandingsTable) {
      setCurrentResults(results.StandingsTable.StandingsLists[0].DriverStandings);
    } else if (category === 'drivers' && dynamicCategory !== 'all' && results.RaceTable && results.RaceTable.Races.length > 0) {
      setCurrentResults(results.RaceTable.Races);
    } else if (category === 'teams' && dynamicCategory === 'all' && results.StandingsTable) {
      setCurrentResults(results.StandingsTable.StandingsLists[0].ConstructorStandings);
    } else if (category === 'teams' && dynamicCategory !== 'all' && results.RaceTable) {
      setCurrentResults(results.RaceTable.Races);
    } else if (category === 'fastest' && results.RaceTable) {
      setCurrentResults(results.RaceTable.Races);
    }
  }, [year, category, dynamicCategory, results]);

  if (category === 'races' && dynamicCategory === 'all') {
    return (
      <div className="archive-container container-lg">
        <h2>{year} Race Results</h2>
        <table className="archive-table">
          <thead>
            <tr>
              <th>GRAND PRIX</th>
              <th className="collapse-column">DATE</th>
              <th>WINNER</th>
              <th>TEAM</th>
              <th className="collapse-column">LAPS</th>
              <th className="collapse-column">TIME</th>
            </tr>
          </thead>
          <tbody>
          {currentResults.map((rr, index) => {
            return <tr key={index}>
              <td>{rr.raceName}</td>
              <td className="collapse-column">{rr.date}</td>
              <td>{rr.Results && rr.Results.length > 0 && rr.Results[0].Driver.givenName} {rr.Results && rr.Results.length > 0 && rr.Results[0].Driver.familyName}</td>
              <td>{rr.Results && rr.Results.length > 0 && rr.Results[0].Constructor.name}</td>
              <td className="collapse-column">{rr.Results && rr.Results.length > 0 && rr.Results[0].laps}</td>
              <td className="collapse-column">{rr.Results && rr.Results.length > 0 && rr.Results[0].Time && rr.Results[0].Time.time}</td>
            </tr>
          })}
          </tbody>
        </table>
      </div>
    )
  }

  if (category === 'races' && dynamicCategory !== 'all') {
    return (
      <div className="archive-container">
        <table className="archive-table">
          <thead>
            <tr>
              <th>POS</th>
              <th>DRIVER</th>
              <th className="collapse-column">TEAM</th>
              <th className="collapse-column">LAPS</th>
              <th>TIME/ISSUE</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
          {currentResults.map((rr, index) => {
            return <tr key={index}>
              <td>{rr.position}</td>
              <td>{rr.Driver && rr.Driver.givenName} {rr.Driver && rr.Driver.familyName}</td>
              <td className="collapse-column">{rr.Constructor && rr.Constructor.name}</td>
              <td className="collapse-column">{rr.laps}</td>
              <td>{rr.Time ? rr.Time.time : rr.status}</td>
              <td>{rr.points}</td>
            </tr>
          })}
          </tbody>
        </table>
      </div>
    )
  }

  if (category === 'drivers' && dynamicCategory === 'all') {
    return (
      <div className="archive-container">
        <table className="archive-table">
          <thead>
            <tr>
              <th>POS</th>
              <th>DRIVER</th>
              <th className="collapse-column">NATIONALITY</th>
              <th>TEAM</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
          {currentResults.map((rr, index) => {
            return <tr key={index}>
              <td>{rr.position}</td>
              <td>{rr.Driver && rr.Driver.givenName} {rr.Driver && rr.Driver.familyName}</td>
              <td className="collapse-column">{rr.Driver && rr.Driver.nationality}</td>
              <td>{rr.Constructors && rr.Constructors.length > 0 && rr.Constructors[0].name}</td>
              <td>{rr.points}</td>
            </tr>
          })}
          </tbody>
        </table>

      </div>
    )
  }

  if (category === 'drivers' && dynamicCategory !== 'all') {
    return (
      <div className="archive-container">
        <table className="archive-table">
          <thead>
            <tr>
              <th>GRAND PRIX</th>
              <th>DATE</th>
              <th className="collapse-column">TEAM</th>
              <th>POS</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
          {currentResults.map((rr, index) => {
            return <tr key={index}>
              <td>{rr.raceName}</td>
              <td>{rr.date}</td>
              <td className="collapse-column">{rr.Results && rr.Results.length > 0 && rr.Results[0].Constructor.name}</td>
              <td>{rr.Results && rr.Results.length > 0 && rr.Results[0].position}</td>
              <td>{rr.Results && rr.Results.length > 0 && rr.Results[0].points}</td>
            </tr>
          })}
          </tbody>
        </table>
      </div>
    )
  }

  if (category === 'teams' && dynamicCategory === 'all') {
    return (
      <div className="archive-container">
        <table className="archive-table">
          <thead>
            <tr>
              <th>POS</th>
              <th>TEAM</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
          {currentResults.map((rr, index) => {
            return <tr key={index}>
              <td>{rr.position}</td>
              <td>{rr.Constructor &&rr.Constructor.name}</td>
              <td>{rr.points}</td>
            </tr>
          })}
          </tbody>
        </table>
      </div>
    )
  }

  if (category === 'teams' && dynamicCategory !== 'all') {
    return (
      <div className="archive-container">
        <table className="archive-table">
          <thead>
            <tr>
              <th>GRAND PRIX</th>
              <th>DATE</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
          {currentResults.map((rr, index) => {
            return <tr key={index}>
              <td>{rr.raceName}</td>
              <td>{rr.date}</td>
              <td>{rr.Results && rr.Results.length > 0 && rr.Results[1] && Number(rr.Results[0].points) + Number(rr.Results[1].points)}</td>
            </tr>
          })}
          </tbody>
        </table>
      </div>
    )
  }
  if (category === 'fastest') {
    return (
      <div className="archive-container">
        <table className="archive-table">
          <thead>
            <tr>
              <th>GRAND PRIX</th>
              <th>DRIVER</th>
              <th>TEAM</th>
              <th>TIME</th>
            </tr>
          </thead>
          <tbody>
          {currentResults.map((rr, index) => {
            return <tr key={index}>
              <td>{rr.raceName}</td>
              <td>{rr.Results && rr.Results.length > 0 && rr.Results[0].Driver.givenName} {rr.Results && rr.Results.length > 0 && rr.Results[0].Driver.familyName}</td>
              <td>{rr.Results && rr.Results.length > 0 && rr.Results[0].Constructor.name}</td>
              <td>{rr.Results && rr.Results.length > 0 && rr.Results[0].FastestLap && rr.Results[0].FastestLap.Time.time}</td>
            </tr>
          })}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <h2>No matches were found</h2>
  )
}