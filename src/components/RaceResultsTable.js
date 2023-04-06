import React, { useState } from 'react'

export default function RaceResultsTable({ results }) {
  const [showResults, setShowResults] = useState(false);

  return (
    <div>Race results
      {results.Results &&
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
                {results.Results.map(rr => {
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
        </>
      }
    </div>
  )
}
