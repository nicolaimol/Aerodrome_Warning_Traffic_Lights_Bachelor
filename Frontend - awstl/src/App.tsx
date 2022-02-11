import React, { useState, useEffect } from 'react';
import './App.css';
import Testlist from './components/Testlist';
import Hello from './components/Hello';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Testinputs from './components/Testinputs';
import axios from 'axios';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import allActions from './Actions'
import ShowInput from './components/ShowInput';
import Arbeider from './components/Arbeider';
import RaskVaer from './components/RaskVaer';
import Bakkemannskap from './components/Bakkemannskap';
import Flygeleder from './components/Flygeleder';
import Pilot from './components/Pilot';
import { Container } from '@mui/material';
import Hjem from './pages/Hjem';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/api/input')
    .then((response) => {
      console.log(response);
      dispatch(allActions.inputActions.setInput(response.data));
    })
  })

/*

      <Banner />
      {<div className="inputs">
        <Testinputs />
      </div>}
      
      <Hello />
      <Testlist />
*/


  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/list" element={<Testlist />} />
        <Route path="/input" element={<Testinputs />} />
        <Route path="/vis" element={<ShowInput />} />
        <Route path="/" element={<Hjem />} />
      </Routes>

    </>

      
  );
}

export default App;

