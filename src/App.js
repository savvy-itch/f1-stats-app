import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import Footer from "./components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/schedule" element={<Schedule />} />
          <Route path="/schedule/:id/:round" element={<RaceDetails />} />
          <Route exact path="/drivers" element={<Drivers />} />
          <Route exact path="/drivers/:id" element={<DriverDetails />} />
          <Route exact path="/teams" element={<Teams />} />
          <Route path="/teams/:id/:name" element={<TeamDetails />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;