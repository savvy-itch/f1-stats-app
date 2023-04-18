import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
// import pages
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import RaceDetails from "./pages/RaceDetails";
import Drivers from './pages/Drivers';
import DriverDetails from "./pages/DriverDetails";
import Teams from './pages/Teams';
import TeamDetails from './pages/TeamDetails';
import Archive from "./pages/Archive";
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
        <Route exact path="/drivers" element={<Drivers />} />
        {/* <Route path="/drivers/:id/:name/:surname" element={<DriverDetails />} /> */}
        <Route exact path="/drivers/:id" element={<DriverDetails />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:id/:name" element={<TeamDetails />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;