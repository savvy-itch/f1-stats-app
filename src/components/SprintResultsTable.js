import React, { useState } from 'react'

export default function SprintResultsTable({ results }) {
  const [showResults, setShowResults] = useState(false);

  return (
    <div>Sprint results
      {results.SprintResults &&
        <>
          <button onClick={() => setShowResults(!showResults)}>
            Results
          </button>
          {showResults && 
            <table className="results-table" border={1}>
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
                {results.SprintResults.map(sr => {
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
        </>
      }
    </div>
  )
}