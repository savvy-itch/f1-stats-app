import React from 'react'

export default function Podium({ raceResults }) {
  return (
    <div className="podium-container">
      <div className="podium-winner">
        <strong style={{color: `var(--${raceResults.Races[0].Results[0].Constructor.constructorId}_color)`}}>1</strong>
        <p>{raceResults.Races[0].Results[0].Driver.givenName} <strong>{raceResults.Races[0].Results[0].Driver.familyName}</strong></p>
        <p>{raceResults.Races[0].Results[0].Time.time}</p>
      </div>
      <div className="podium-winner">
        <strong style={{color: `var(--${raceResults.Races[0].Results[1].Constructor.constructorId}_color)`}}>2</strong>
        <p>{raceResults.Races[0].Results[1].Driver.givenName} <strong>{raceResults.Races[0].Results[1].Driver.familyName}</strong></p>
        <p>{raceResults.Races[0].Results[1].Time.time}</p>
      </div>
      <div className="podium-winner">
        <strong style={{color: `var(--${raceResults.Races[0].Results[2].Constructor.constructorId}_color)`}}>3</strong>
        <p>{raceResults.Races[0].Results[2].Driver.givenName} <strong>{raceResults.Races[0].Results[2].Driver.familyName}</strong></p>
        <p>{raceResults.Races[0].Results[2].Time.time}</p>
      </div>
    </div>
  )
}
