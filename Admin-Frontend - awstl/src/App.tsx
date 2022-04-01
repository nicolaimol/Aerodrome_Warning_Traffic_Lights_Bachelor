import React from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';
import Hjem from './pages/Hjem'
import Flyplass from './pages/Flyplass'
import Terskel from './pages/Terskel'
import Navbar from './components/Navbar'
import { TokenContextProvider} from "./util/DataContext";

function App() {
  return (
      <TokenContextProvider>
          <div style={{display: 'flex',flexDirection:'column', minHeight: '100vh'}}>
              <Navbar />
              <div style={{display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center',}}>
                  <Routes>
                      <Route path="/flyplass" element={<Flyplass />} />
                      <Route path="/terskelverdi" element={<Terskel />} />
                      <Route path="/" element={<Hjem />} />
                  </Routes>
              </div>
          </div>
      </TokenContextProvider>
  );
}

export default App;
