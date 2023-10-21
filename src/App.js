import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes
import Homepage from './components/Homepage';
import Header from './components/Header';
import React, { useEffect, useState } from 'react';
import ResultScreen from './components/ResultScreen';
import Footer from './components/Footer';
import Body from './components/Body';

function App() {
  const arr = [1, 2, 3, 4];
   const initialSelectedPlanets = Array(arr.length).fill(null);
  const initialSelectedVehicles = Array(arr.length).fill(null);
  const [selectedPlanets, setSelectedPlanets] = useState(Array(arr.length).fill(null));
  const [selectedVehicles, setSelectedVehicles] = useState(Array(arr.length).fill(null));

  const resetSelections = () => {
    setSelectedPlanets(initialSelectedPlanets);
    setSelectedVehicles(initialSelectedVehicles);
  };

  return (
    <div className="App">
      <React.StrictMode>
        <Router>
        <Header resetSelections={resetSelections}/>
          <Routes>
            <Route path="/" element={
              <Homepage 
                selectedPlanets={selectedPlanets}
                selectedVehicles={selectedVehicles}
                setSelectedPlanets={setSelectedPlanets}
                setSelectedVehicles={setSelectedVehicles}
                resetSelections={resetSelections}
                arr ={arr}
              />} 
            />
            <Route path="/result" element={<ResultScreen resetSelections={resetSelections} />} />
          </Routes>
        </Router>
        <Footer />
      </React.StrictMode>
    </div>
  );
}

export default App;
