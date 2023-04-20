import React from 'react'
import './Home.css';

export default function Home() {
  return (
    <div className="container-sm">
      <div className="parallax-container">
        <div className="main-news">
          <div>
            <h2>Wolff says W14 pace is 'only the tip of the iceberg' as Mercedes upgrades imminent</h2>
          </div>
          <div className="static-img">
          </div>
        </div>
        <div className="scrollable-imgs">
          <img src="/images/drivers/BOT.jpg" alt="" />
          <img src="/images/drivers/DEV.jpg" alt="" />
        </div>
      </div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae temporibus voluptatibus a, omnis ipsum cum, dicta consectetur provident distinctio enim in aut itaque dolores ut quas necessitatibus veniam reprehenderit sunt? Reiciendis magni, molestias nihil vel nobis ullam illo harum saepe similique? Autem natus error earum fugit aliquam, minus quo porro.</div>
    </div>
  )
}