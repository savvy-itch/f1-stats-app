import React, { useState, useEffect } from 'react'

export default function Timer({ allResults }) {
  const [remainingTime, setRemainingTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const units = document.querySelectorAll('.unit > div');

  function format(unit) {
    if (unit < 10) {
      return `0${unit}`;
    }
    return unit;
  }

  useEffect(() => {
    if (allResults.Races && allResults.Races.length > 0) {
      const futureDate = new Date(allResults.Races[0].Qualifying.date).getTime();
      // const futureDate = new Date().getTime() + 10000;

      let countdown = setInterval(() => {
        const today = new Date().getTime();
        const t = futureDate - today;

        // if the time has run out
        if (t < 0) {
          // prevent timer from counting negative time
          clearInterval(countdown);
          setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          const oneDay = 24*60*60*1000;
          const oneHour = 60*60*1000;
          const oneMinute = 60*1000;

          let days = Math.floor(t/oneDay);
          let hours = Math.floor((t % oneDay) / oneHour);
          let minutes = Math.floor((t % oneHour) / oneMinute);
          let seconds = Math.floor((t % oneMinute) / 1000);

          setRemainingTime({
            days: format(days),
            hours: format(hours),
            minutes: format(minutes),
            seconds: format(seconds),
          });
        }
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [allResults]);

  // hide timer after the time has run out
  if (!remainingTime.days && !remainingTime.hours && !remainingTime.minutes && !remainingTime.seconds) {
    return null;
  }

  return (
    <div className="timer-div">
      <div>grand prix weekend</div>
      <div className="time-units">
        <div className="unit">
          <div>{remainingTime.days}</div>
          <span>days</span>
        </div>
        <div className="unit">
          <div>{remainingTime.hours}</div>
          <span>hrs</span>
        </div>
        <div className="unit">
          <div>{remainingTime.minutes}</div>
          <span>mins</span>
        </div>
        <div className="unit">
          <div>{remainingTime.seconds}</div>
          <span>secs</span>
        </div>
      </div>
    </div>
  )
}