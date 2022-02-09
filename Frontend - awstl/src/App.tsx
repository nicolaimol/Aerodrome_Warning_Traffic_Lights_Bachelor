import React, { useState, useEffect } from 'react';
import axio from 'axios';
import './App.css';
import axios from 'axios';
import Testlist from './components/Testlist';
import Hello from './components/Hello';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Hello />
      <Testlist />
    </>
  );
}

export default App;
