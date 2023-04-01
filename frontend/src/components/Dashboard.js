import React from 'react';
import FitnessTip from './FitnessTip';
import PageWrapper from './PageWrapper';

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
};

// Replace this with a call to an API to fetch a random fitness tip

const Dashboard = () => {
  const calorieProgress = (userData.dailyCalories / userData.dailyCaloriesGoal) * 100;
  const kmsRanProgress = (userData.kmsRan / userData.kmsRanGoal) * 100;

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

      <h3>Fitness Tip of the Day</h3>
      <FitnessTip />
    </PageWrapper>
  );
};

export default Dashboard;
