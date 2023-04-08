import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
// import pages
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import RaceDetails from "./pages/RaceDetails";
import Drivers from './pages/Drivers';
import Teams from './pages/Teams';
import Error from './pages/Error';
// import components
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/schedule/:id/:round" element={<RaceDetails />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;