import React from 'react';
import './Error.css';
import { Link } from 'react-router-dom';

export default function Error() {

  return (
    <section className="error-page">
      <h1>Oops!</h1>
      <p>Looks like it's a dead end.</p>
      <Link to="/">
        <button className="error-btn">Go Home</button>
      </Link>
    </section>
  )
}