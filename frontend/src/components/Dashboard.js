import React, { useState, useEffect } from 'react';
import FitnessTip from './FitnessTip';
import PageWrapper from './PageWrapper';
import api from "../api"

// Replace this with a call to your backend API to fetch user data
const userData = {
  name: 'John Doe',
  dailyCalories: 1800,
  dailyCaloriesGoal: 2500,
  kmsRan: 5,
  kmsRanGoal: 7,
  recentActivities: [
    { type: 'Push-ups', sets: 3, reps: 15 },
    { type: 'Pull-ups', sets: 4, reps: 10 },
    { type: 'Squats', sets: 5, reps: 20 },
  ],
  foodEaten: [
    { name: 'Eggs', calories: 155 },
    { name: 'Apple', calories: 95 },
    { name: 'Banana', calories: 89 },
  ],
  bmi: 22.3,
  health: 'Normal',
};

const Dashboard = () => {
  const [caloriesLeft, setCaloriesLeft] = useState(0);

  useEffect(() => {
    const consumedCalories = userData.foodEaten.reduce(
      (total, food) => total + food.calories,
      0
    );
    setCaloriesLeft(userData.dailyCaloriesGoal - consumedCalories);
  }, []);

  const calorieProgress = (userData.dailyCalories / userData.dailyCaloriesGoal) * 100;
  const kmsRanProgress = (userData.kmsRan / userData.kmsRanGoal) * 100;
  const kmsLeft = userData.kmsRanGoal - userData.kmsRan;

  return (
    <PageWrapper>
      <h2>Welcome, {userData.name}!</h2>

      <h3>Progress Summary</h3>
      <p>Calories consumed: {userData.dailyCalories} / {userData.dailyCaloriesGoal}</p>
      <progress value={calorieProgress} max="100"></progress>

      <p>Kilometers ran: {userData.kmsRan} / {userData.kmsRanGoal} km</p>
      <progress value={kmsRanProgress} max="100"></progress>

      <h3>Recent Activities</h3>
      <ul>
        {userData.recentActivities.map((activity, index) => (
          <li key={index}>
            {activity.type}: {activity.sets} sets of {activity.reps} reps
          </li>
        ))}
      </ul>

      <h3>Today's Food Intake</h3>
      <ul>
        {userData.foodEaten.map((food, index) => (
          <li key={index}>
            {food.name}: {food.calories} calories
          </li>
        ))}
      </ul>
      <p>Calories left today: {caloriesLeft}</p>

      <h3>Kilometers Left to Goal: {kmsLeft} km</h3>

      <h3>Current BMI and Health Condition</h3>
      <p>BMI: {userData.bmi.toFixed(2)}</p>
      <p>Health: {userData.health}</p>

      <h3>Fitness Tip of the Day</h3>
      <FitnessTip />
    </PageWrapper>
  );
};

export default Dashboard;
