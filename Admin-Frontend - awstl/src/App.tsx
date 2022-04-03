import React from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';
import Hjem from './pages/Hjem'
import Flyplass from './pages/Flyplass'
import Terskel from './pages/Terskel'
import Navbar from './components/Navbar'
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./util/keycloak"
import SecureRoute from "./components/SecureRoute";

function App() {
  return (
          <div style={{display: 'flex',flexDirection:'column', minHeight: '100vh'}}>
              <ReactKeycloakProvider authClient={keycloak}>
                  <Navbar />
                  <div style={{display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center',}}>
                      <Routes>
                          <Route path="/flyplass" element={
                              <SecureRoute role="user">
                                  <Flyplass />
                              </SecureRoute>
                          } />
                          <Route path="/terskelverdi" element={
                              <SecureRoute role="admin" >
                                  <Terskel />
                              </SecureRoute>
                          } />
                          <Route path="/" element={<Hjem />} />
                      </Routes>
                  </div>
              </ReactKeycloakProvider>
          </div>
  );
}

export default App;
