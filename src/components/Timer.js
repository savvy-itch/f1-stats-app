import React, { useState, useEffect } from 'react'

export default function Timer({ allResults }) {
  const [remainingTime, setRemainingTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // allResults.Races[0].Qualifying.date
  // allResults.Races[0].Qualifying.time
  const items = document.querySelectorAll('.t');

  // let futureDate;

  // if (allResults.Races && allResults.Races.length > 0) {
  //   futureDate = new Date(allResults.Races[0].Qualifying.date);
  // }
  // const futureTime = futureDate.getTime();
  // function getRemainingTime() {
  //   const today = new Date().getTime();
  //   const t = futureTime - today;

  //   const oneDay = 24*60*60*1000;
  //   const oneHour = 60*60*1000;
  //   const oneMinute = 60*1000;

  //   let days = Math.floor(t/oneDay);
  //   let hours = Math.floor((t % oneDay) / oneHour);
  //   let minutes = Math.floor((t % oneHour) / oneMinute);
  //   let seconds = Math.floor((t % oneMinute) / 1000);

  //   const values = [days, hours, minutes, seconds];

  //   function format(item) {
  //     if (item < 10) {
  //       return (item = `0${item}`);
  //     }
  //     return item;
  //   }

  //   items.forEach((item, index) => {
  //     item.innerHTML = format(values[index]);
  //   });
  //   let countdown = setInterval(getRemainingTime, 1000);
  // }
  // getRemainingTime();

  useEffect(() => {
    let countdown = setInterval(() => {
      const today = new Date().getTime();
      const futureDate = new Date(allResults.Races[0].Qualifying.date).getTime();
      const t = futureDate - today;

      const oneDay = 24*60*60*1000;
      const oneHour = 60*60*1000;
      const oneMinute = 60*1000;

      let days = Math.floor(t/oneDay);
      let hours = Math.floor((t % oneDay) / oneHour);
      let minutes = Math.floor((t % oneHour) / oneMinute);
      let seconds = Math.floor((t % oneMinute) / 1000);

      setRemainingTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(countdown);
  }, [allResults]);



  return (
    <div>
      <div>Timer</div>
      {allResults.Races && allResults.Races.length > 0 && 
      <div>
        <div className="t">Days: {remainingTime.days}</div>
        <div className="t">Hours: {remainingTime.hours}</div>
        <div className="t">Minutes: {remainingTime.minutes}</div>
        <div className="t">Seconds: {remainingTime.seconds}</div>
      </div>
      }
    </div>
  )
}
