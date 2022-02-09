import React, { useState, useEffect } from 'react';
import './App.css';
import Testlist from './components/Testlist';
import Hello from './components/Hello';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Testinputs from './components/Testinputs';

function App() {
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
