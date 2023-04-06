import React, { useState } from 'react'

export default function QualificationResultsTable({ results }) {
  const [showResults, setShowResults] = useState(false);

  return (
    <div>Qualifying
      {results.QualifyingResults && 
        <>
          <button onClick={() => setShowResults(!showResults)}>
            Results
          </button>
          <table className={`results-table ${showResults ? 'show' : 'hide'}`} 
            border={1}>
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
              {results.QualifyingResults.map(qr => {
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
        </>
      }
    </div>
  )
}