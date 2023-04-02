import React, { useState, useEffect } from 'react';
import PageWrapper from './PageWrapper';
import api from '../api';

const BMICalculator = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiData, setBmiData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get("/bmi");
    const data = response.data;
    if (data.bmiData) {
      setBmiData(data.bmiData);
    }
  };

  const updateBackend = async (newData) => {
    await api.put("/bmi", { bmiData: newData });
  };
  

  const calculateHealth = (bmi) => {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return 'Normal';
    } else if (bmi >= 25 && bmi <= 29.9) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const health = calculateHealth(bmi);
    const newBmiData = { bmi, health };
    setBmiData(newBmiData);
    await updateBackend(newBmiData);
  };

  return (
    <PageWrapper>
      <h2>BMI Calculator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </label>
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </label>
        <button type="submit">Calculate</button>
      </form>
      {bmiData ? (
        <div>
          <p>BMI: {bmiData.bmi.toFixed(2)}</p>
          <p>Health: {bmiData.health}</p>
        </div>
      ) : (
        <p>Enter your age, weight, and height to calculate your BMI.</p>
      )}
    </PageWrapper>
  );
};

export default BMICalculator;
