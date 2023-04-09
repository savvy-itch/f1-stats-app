import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function SprintResultsTable({ results, schedule, getFormattedMonth }) {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="single-stage-container">
      <article className="results-tab">
        {schedule.Races && schedule.Races[0].Sprint &&
          <div className="results-date">
            {schedule.Races[0].Sprint.date.substring(8,)}
            <div>{getFormattedMonth(schedule.Races[0].Sprint.date)}</div>  
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