import React, { useState, useEffect } from 'react';
import axio from 'axios';
import './App.css';
import axios from 'axios';
import Testlist from './Testlist';
import Hello from './Hello';

function App() {
  return (
    <>
      <Hello />
      <Testlist />
    </>
  );
}

export default App;
