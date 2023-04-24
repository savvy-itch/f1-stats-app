import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './GoToTopBtn.css';

export default function GoToTopBtn() {
  const [showBtn, setShowBtn] = useState(false);

  function goToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    function handleScroll() {
      // show button only after scrolling down 500px
      window.scrollY >= 500 ? setShowBtn(true) : setShowBtn(false);
    }
    // set listener to update scrolling constantly
    window.addEventListener('scroll', handleScroll);
    // remove listener to prevent memeory leak
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button className={`teleport-btn ${showBtn ? 'show-teleport-btn' : ''}`} 
      onClick={goToTop}
    >
      <FaArrowUp />
    </button>
  )
}