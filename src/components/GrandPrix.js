import React from 'react'
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

export default function GrandPrix({grandPrix, index}) {
  const { Circuit, FirstPractice, date, raceName } = grandPrix;
  let formattedMonth = new Date(date);
  const options = { month: 'short' };
  formattedMonth = formattedMonth.toLocaleDateString('en-US', options);
  console.log(grandPrix);

  return (
    <Link 
      to={`/schedule/${grandPrix.Circuit.circuitId}/${grandPrix.round}`}
    >
      <div className='grand-prix'>
        <fieldset>
          <legend className="grand-prix-round">Round {index + 1}</legend>
          <div className="grand-prix-inner-container">
            <p className="grand-prix-date">{FirstPractice.date.substring(8,)}-{date.substring(8,)}</p>
            <div className="grand-prix-month">{formattedMonth}</div>
            <div className="divider-line"></div>
            <p className="grand-prix-country">
              {Circuit.Location.country}
              <FaChevronRight style={{color: '#e10600'}} />
            </p>
            <p className="grand-prix-name">{raceName}</p>
            <div className="divider-line"></div>
            <div className="grand-prix-img-wrapper">
              <img src={`images/circuits/${Circuit.circuitId}.png`} alt={Circuit.circuitName} />
            </div>
          </div>
        </fieldset>
      </div>
    </Link>
  )
}
