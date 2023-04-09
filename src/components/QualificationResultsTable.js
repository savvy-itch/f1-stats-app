import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function QualificationResultsTable({ results, schedule, getFormattedMonth }) {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="single-stage-container">
      <article className="results-tab">
        {schedule.Races && schedule.Races.length > 0 && 
          <div className="results-date">
            {schedule.Races[0].Qualifying.date.substring(8,)}
            <div>{getFormattedMonth(schedule.Races[0].Qualifying.date)}</div>  
          </div>
        }
        <div className="stage-name">
          Qualifying
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
              <th>q1</th>
              <th>q2</th>
              <th>q3</th>
            </tr>
          </thead>
          <tbody>
            {results.Races[0].QualifyingResults.map(qr => {
              return <tr key={qr.Driver.driverId}>
                <td>{qr.position}</td>
                <td>{qr.number}</td>
                <td>{qr.Driver.givenName} {qr.Driver.familyName}</td>
                <td>{qr.Constructor.name}</td>
                <td>{qr.Q1}</td>
                <td>{qr.Q2}</td>
                <td>{qr.Q3}</td>
              </tr>
            })}
          </tbody>
        </table>
      }
    </div>
  )
}