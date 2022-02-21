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


/***
 * Fargepalett!!!
 * 
 * Blå skrift: #0090a8
 * Bakgrunn: #dff2f6
 * Mørkeblå kort: #0494ac
 * Footer: #496c80
 */


function App() {

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

