import React, { useState } from 'react';
import axio from 'axios';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [melding, setMelding] = useState("")

  axios.get("/api/hei")
  .then(response => {
    console.log(response)
    setMelding(response.data);
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {melding}
        </a>
      </header>
    </div>
  );
}

export default App;
