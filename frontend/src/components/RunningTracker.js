import React, { useState, useEffect } from 'react';
import PageWrapper from './PageWrapper';
import api from '../api';
import axios from 'axios';

const RunningTracker = () => {
  const [distance, setDistance] = useState('');
  const [weeklyGoal, setWeeklyGoal] = useState(1000);
  const [weeklyDistance, setWeeklyDistance] = useState(0);
  const [runs, setRuns] = useState([]);
  const [kmRan, setKmRan] = useState(0);
  const [goalKm, setGoalKm] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/runs")
      const data = response.data;
      setRuns(data.runs);
      setKmRan(data.kmRan);
      setGoalKm(data.goalKm);
    }
    fetchData();
  }, []);


  const handleAddRun = async (e) => {
    e.preventDefault();
    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const newRun = { date: dateString, distance: parseFloat(distance) };
    const updatedRuns = [...runs, newRun];
    setRuns(updatedRuns);
    setWeeklyDistance(weeklyDistance + parseFloat(distance));
    setDistance('');

    await api.post('/running', { runs: updatedRuns, weeklyGoal, weeklyDistance });
  };

  const remainingKilometers = weeklyGoal - weeklyDistance;
  const progressBarPercentage = Math.min(100, (weeklyDistance / weeklyGoal) * 100);
  
  return (
    <PageWrapper>
      <h2>Running Tracker</h2>
      <form onSubmit={handleAddRun}>
        <label htmlFor="distance">Kilometers Run:</label>
        <input
          type="number"
          step="0.01"
          id="distance"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          required
        />
        <button type="submit">Add Run</button>
      </form>

      <h3>Runs:</h3>
      <ul>
        {runs.map((run, index) => (
          <li key={index}>
            {run.date} - {run.distance} km
          </li>
        ))}
      </ul>

      <h3>Weekly Goal:</h3>
      <input
        type="number"
        step="0.01"
        value={weeklyGoal}
        onChange={(e) => setWeeklyGoal(parseFloat(e.target.value))}
      />
      km

      <h3>Kilometers to Go: {remainingKilometers.toFixed(2)} km</h3>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
      <div
        style={{
          width: '100%',
          height: '20px',
          backgroundColor: '#f3f3f3',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '0',
            top: '0',
            height: '100%',
            width: `${progressBarPercentage}%`,
            backgroundColor: progressBarPercentage < 100 ? '#007BFF' : '#28a745',
          }}
        ></div>
      </div>
      <span style={{ marginLeft: '0.5rem' }}>{progressBarPercentage.toFixed(2)}%</span>
    </div>
    </PageWrapper>
  );
};

export default RunningTracker;
