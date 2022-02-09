import React, { useState, useEffect } from 'react';
import './App.css';
import Testlist from './components/Testlist';
import Hello from './components/Hello';
import Navbar from './components/Navbar';
import Banner from './components/Banner';

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <Hello />
      <Testlist />
    </>
  );
}

export default App;
