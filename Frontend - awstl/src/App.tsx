import React, { useState, useEffect } from 'react';
import './App.css';
import Testlist from './components/Testlist';
import Navbar from './components/Navbar';
import Testinputs from './components/Testinputs';
import axios from 'axios';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ShowInput from './components/ShowInput';
import Footer from './components/Footer';
import Hjem from './pages/Hjem';
import Trafikklys from './pages/Trafikklys';


/***
 * Fargepalett!!!
 * 
 * Blå skrift: #0090a8
 * Bakgrunn: #dff2f6
 * Mørkeblå kort: #0494ac
 * Footer: #496c80
 */

/**
 * Ved push husk å endre API kall bort fra localhost
 * 
 * Dette er på 
 * 
 * Banner.tsx
 * RaskVaer.tsx
 * 
 */



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    /*
    axios.get('http://localghost:8080/api/input')
    .then((response) => {
      console.log(response);
      dispatch(allActions.inputActions.setInput(response.data));
    })
    */
  }, [])


  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/list" element={<Testlist />} />
        <Route path="/input" element={<Testinputs />} />
        <Route path="/vis" element={<ShowInput />} />
        <Route path="/trafikklys" element={<Trafikklys />} />
        <Route path="/" element={<Hjem />} />
      </Routes>

      <Footer />

    </>

      
  );
}

export default App;

