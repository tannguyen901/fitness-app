import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ExerciseTracker from './components/ExerciseTracker';
import FoodTracker from './components/FoodTracker';
import RunningTracker from './components/RunningTracker';
import BMICalculator from './components/BMICalculator';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exercise-tracker" element={<ExerciseTracker />} />
            <Route path="/food-tracker" element={<FoodTracker />} />
            <Route path="/running-tracker" element={<RunningTracker />} />
            <Route path="/bmi-calculator" element={<BMICalculator />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
