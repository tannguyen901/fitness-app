import React, { useState, useEffect } from "react";
import FitnessTip from "./FitnessTip";
import PageWrapper from "./PageWrapper";
import api from "../api";
import styles from "./Dashboard.module.css";
import BMIChart from "./BMIChart";

const Dashboard = () => {
  const [caloriesLeft, setCaloriesLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [foodData, setFoodData] = useState({
    data: [],
    totalCalories: 0,
    goalCalories: 0,
  });
  const [bmiData, setBMIData] = useState({ bmiData: { bmi: 0, health: "" } });
  const [exerciseData, setExerciseData] = useState({
    Push: [],
    Pull: [],
    Legs: [],
  });
  const [runningData, setRunningData] = useState({
    data: [],
    weeklyGoal: 0,
    weeklyDistance: 0,
    kmRan: 0,
    goalKm: 0,
  });

  const { Push, Pull, Legs } = exerciseData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bmiURL = "/bmi";
        const exerciseURL = "/exercises";
        const foodURL = "/foods";
        const runningURL = "/runs";

        const [bmiResponse, exerciseResponse, foodResponse, runningResponse] =
          await Promise.all([
            api.get(bmiURL),
            api.get(exerciseURL),
            api.get(foodURL),
            api.get(runningURL),
          ]);

        setBMIData(bmiResponse.data || { bmiData: { bmi: 0, health: "" } });
        setExerciseData(
          exerciseResponse.data[0] || { Push: [], Pull: [], Legs: [] }
        );
        setFoodData(foodResponse.data);
        setRunningData(runningResponse.data);
        setLoading(false);
        console.log(exerciseResponse.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCaloriesLeft(foodData.goalCalories - foodData.totalCalories);
  }, [foodData]);

  const calorieProgress =
    (foodData.totalCalories / foodData.goalCalories) * 100;
  const kmsRanProgress =
    (runningData.weeklyDistance / runningData.weeklyGoal) * 100;

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <PageWrapper>
      <div className={styles.section}>
        <h2>Welcome, User!</h2>
        <h3>Fitness Tip of the Day</h3>
        <FitnessTip />
      </div>
      <div className={styles.dashboardContainer}>
        <div className={styles.section}>
          <h3>Progress Summary</h3>
          <p>
            Calories consumed: {foodData.totalCalories} /{" "}
            {foodData.goalCalories}
          </p>
          <progress value={calorieProgress} max="100"></progress>
          <p>
            Kilometers ran: {runningData.weeklyDistance} /
            {runningData.weeklyGoal}km
          </p>
          <progress value={kmsRanProgress} max="100"></progress>
          <h3>
            Calories Left to Goal:{" "}
            {foodData.goalCalories - foodData.totalCalories} cal
          </h3>
          <h3>
            Kilometers Left to Goal:{" "}
            {runningData.weeklyGoal - runningData.weeklyDistance} km
          </h3>
        </div>
        <div className={styles.section}>
          <h3>Today's Food Intake</h3>
          <ul>
            {foodData &&
              foodData.data.map((item, index) => (
                <li key={index}>
                  {item.food}: {item.calories} calories
                </li>
              ))}
          </ul>
          <p>Calories left today: {caloriesLeft}</p>
        </div>
        <div className={styles.section}>
          <h3>Recent Activities</h3>
          <h4>Push</h4>
          <ul>
            {Push &&
              Push.map((body_exercise, index) => (
                <li key={index}>
                  {body_exercise.name}: {body_exercise.sets} sets of{" "}
                  {body_exercise.reps} reps
                </li>
              ))}
          </ul>
          <h4>Pull</h4>
          <ul>
            {Pull &&
              Pull.map((body_exercise, index) => (
                <li key={index}>
                  {body_exercise.name}: {body_exercise.sets} sets of{" "}
                  {body_exercise.reps} reps
                </li>
              ))}
          </ul>
          <h4>Legs</h4>
          <ul>
            {Legs &&
              Legs.map((body_exercise, index) => (
                <li key={index}>
                  {body_exercise.name}: {body_exercise.sets} sets of{" "}
                  {body_exercise.reps} reps
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.section}>
          <h3>Current BMI and Health Condition</h3>
          <p>BMI: {bmiData.bmiData.bmi.toFixed(2)}</p>
          <p>Health: {bmiData.bmiData.health}</p>
          <BMIChart bmi={bmiData.bmiData.bmi} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
