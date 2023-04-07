import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function SprintResultsTable({ results, getFormattedMonth }) {
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
          Sprint
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
        <table className={`results-table ${showResults ? 'show' : 'hide'}`}>
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
            {results.Races[0].SprintResults.map(sr => {
              return <tr key={sr.Driver.driverId}>
                <td>{sr.position}</td>
                <td>{sr.number}</td>
                <td>{sr.Driver.givenName} {sr.Driver.familyName}</td>
                <td>{sr.Constructor.name}</td>
                <td>{sr.laps}</td>
                <td>{sr.Time ? sr.Time.time : 'DNF'}</td>
                <td>{sr.points}</td>
              </tr>
            })}
          </tbody>
        </table>
      }
    </div>
  )
}