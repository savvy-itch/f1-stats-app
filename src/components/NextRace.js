import React from 'react';

export default function NextRace({ nextRace }) {
  const {Races: [race]} = nextRace;
  let formattedMonth = new Date(race.FirstPractice.date);
  const monthOptions = { month: 'short' };
  formattedMonth = formattedMonth.toLocaleDateString('en-US', monthOptions);

  function getWeekday(date) {
    let formattedWeekday = new Date(date);
    const weekdayOptions = { weekday: 'short' };
    formattedWeekday = formattedWeekday.toLocaleDateString('en-US', weekdayOptions);
    return formattedWeekday;
  }

  return (
    <article className="next-race">
      <fieldset className="container-sm">
        <legend className="grand-prix-round">Round {nextRace.round} - Up Next</legend>
        <div className="next-race-wrapper">
          <div className="next-race-inner-container">
            <p className="grand-prix-date">{race.FirstPractice.date.substring(8,)}-{race.date.substring(8,)}</p>
            <div className="next-race-month">{formattedMonth}</div>
            <div className="divider-line"></div>
            <p className="next-race-country">{race.Circuit.Location.country}</p>
            <p className="grand-prix-name">{race.raceName}</p>
            <div className="divider-line"></div>
            <div className="grand-prix-img-wrapper">
              <img src={`images/circuits/${race.Circuit.circuitId}.png`} alt={race.Circuit.circuitName} />
            </div>
          </div>
          <div className="next-race-inner-container">
            <div className="next-race-time">
              <div>
                <p>practice 1:</p>
                <div className="stage-weekday">{getWeekday(race.FirstPractice.date)}</div>
                <div className="stage-time">{race.FirstPractice.time.substring(0,5)}</div>
              </div>
              <div>
                <p>qualifying:</p>
                <div className="stage-weekday">{getWeekday(race.Qualifying.date)}</div>
                <div className="stage-time">{race.Qualifying.time.substring(0,5)}</div>
              </div>
              <div>
                <p>practice 2:</p>
                <div className="stage-weekday">{getWeekday(race.SecondPractice.date)}</div>
                <div className="stage-time">{race.SecondPractice.time.substring(0,5)}</div>
              </div>
            </div>
            <div className="divider-line"></div>
            <div className="next-race-time">
              {/* if there's a sprint element in race qualifying */}
              {race.Sprint?.date && 
                <div>
                  <p>sprint:</p>
                  <div className="stage-weekday">{getWeekday(race.Sprint.date)}</div>
                  <div className="stage-time">{race.Sprint.time.substring(0,5)}</div>
                </div>
              }
              <div>
                <p>race:</p>
                <div className="stage-weekday">{getWeekday(race.date)}</div>
                <div className="stage-time">{race.time.substring(0,5)}</div>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </article>
  )
}