import React, { useState, useEffect } from 'react';
import './App.css';
import Testlist from './components/Testlist';
import Hello from './components/Hello';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Testinputs from './components/Testinputs';
import axios from 'axios';


function App() {

  interface inputs {
    input1: string;
    input2: string;
    input3: string;
  }

  useEffect(() => {
    axios.get('/api/input')
    .then((response) => {
      console.log(response);
    })
  })




  return (
    <>
      <Navbar />
      <Banner />
      {<div className="inputs">
        <Testinputs />
      </div>}
      
      <Hello />
      <Testlist />
    </>
  );
}

export default App;

