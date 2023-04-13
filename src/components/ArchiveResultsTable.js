import React from 'react'

export default function ArchiveResultsTable({ results }) {
  return (
    <table>
      <thead>
        <tr>
          <th>GRAND PRIX</th>
          <th>DATE</th>
          <th>WINNER</th>
          <th>TEAM</th>
          <th>LAPS</th>
          <th>TIME</th>
        </tr>
      </thead>
      <tbody>
      {results.map(rr => {
        return <tr key={rr.raceName}>
          <td>{rr.raceName}</td>
          <td>{rr.date}</td>
          <td>{rr.Results[0].Driver.givenName} {rr.Results[0].Driver.familyName}</td>
          <td>{rr.Results[0].Constructor.name}</td>
          <td>{rr.Results[0].laps}</td>
          <td>{rr.Results[0].Time.time}</td>
        </tr>
      })}
      </tbody>
    </table>
  )
}
