import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function RaceResultsTable({ results, getFormattedMonth }) {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="single-stage-container">
      <article className="results-tab">
        {results.Races && results.Races.length > 0 && 
          <div className="results-date">
            {results.Races[0].date.substring(8,)}
            <div>{getFormattedMonth(results.Races[0].date)}</div>  
          </div>
        }
        <div className="stage-name">
          Race
        </div>
        {results.Races && results.Races.length > 0 &&
        <button className="results-btn" 
          onClick={() => setShowResults(!showResults)}>
          Results
          <FaChevronDown style={{color: '#e10600', marginLeft: '10px'}} />
        </button>
        }
      </article>
      {results.Races && results.Races.length > 0 &&
        <table className={`results-table ${showResults ? 'show' : 'hide'}`} >
          <thead>
            <tr>
              <th>pos</th>
              <th>no</th>
              <th>driver</th>
              <th>team</th>
              <th>laps</th>
              <th>time</th>
              <th>pts</th>
            </tr>
          </thead>
          <tbody>
            {results.Races[0].Results.map(rr => {
              return <tr key={rr.Driver.driverId}>
                <td>{rr.position}</td>
                <td>{rr.number}</td>
                <td>{rr.Driver.givenName} {rr.Driver.familyName}</td>
                <td>{rr.Constructor.name}</td>
                <td>{rr.laps}</td>
                <td>{rr.Time ? rr.Time.time : 'DNF'}</td>
                <td>{rr.points}</td>
              </tr>
            })}
          </tbody>
        </table>
      }
    </div>
  )
}
