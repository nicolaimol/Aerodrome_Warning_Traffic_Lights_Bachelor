import React, { useState, useEffect } from 'react';
import './App.css';
import Testlist from './components/Testlist';
import Navbar from './components/Navbar';
import Testinputs from './components/Testinputs';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ShowInput from './components/ShowInput';
import Footer from './components/Footer';
import Hjem from './pages/Hjem';
import Trafikklys from './pages/Trafikklys';
import axios from 'axios'
import { useDispatch} from 'react-redux'
import allActions from './Actions';


/***
 * Fargepalett!!!
 * 
 * Blå skrift: #0090a8
 * Bakgrunn: #dff2f6
 * Mørkeblå kort: #0494ac
 * Footer: #496c80
 */


function App() {

    const dispatch = useDispatch()

    let url = ""
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        if (process.env.REACT_APP_URL_ENV == "prod") {
            url = "/api/terskel"
        }
        else {
            url = "http://localhost:8080/api/terskel"
        }
    } else {
        url = "/api/terskel"
    }

    const defaultVerdier = {
        airTemp: 0,
        precipitationAmmount: 20,
        windSpeed: 30,
        windGust: 40,
        probThunder: 0,
        humidity: 2,
        fog: 40,
        probIce: 20,
        crosswind: 50,
    };

    axios.get(url)
        .then((response: any) => {
            const flyplass = response.data.flyplass
            delete response.data.flyplass

            dispatch(allActions.airportAction.setAirport(flyplass))
            dispatch(allActions.terskelActions.setTerskel(response.data))
        })
        .catch((error: any) => {
            dispatch(allActions.airportAction.setAirport({icao: "endu", navn: "Bardufoss Lufthand"}))
            dispatch(allActions.terskelActions.setTerskel(defaultVerdier))
        })


  return (
    <div className="outer" style={{display: 'flex', minHeight: "100vh", flexDirection: "column"}}>
      <Navbar />

      <div style={{flexGrow: 1}}>
        <Routes>
          <Route path="/list" element={<Testlist />} />
          <Route path="/input" element={<Testinputs />} />
          <Route path="/vis" element={<ShowInput />} />
          <Route path="/trafikklys" element={<Trafikklys />} />
          <Route path="/" element={<Hjem />} />
        </Routes>
      </div>
        
      
      

      <Footer />

    </div>

      
  );
}

export default App;

