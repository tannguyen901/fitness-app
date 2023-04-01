import React, { useState, useEffect } from "react";
import PageWrapper from "./PageWrapper";
import api from "../api";

const FoodTracker = () => {
  const [foods, setFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [goalCalories, setGoalCalories] = useState(2000);
  const [caloriesInput, setCaloriesInput] = useState("");
  const [foodInput, setFoodInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get('/foods');
      setFoods(data.data);
      setTotalCalories(data.totalCalories);
      setGoalCalories(data.goalCalories);
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    const updateBackend = async () => {
      await api.post('/foods', { foods, totalCalories, goalCalories });
    };

    updateBackend();
  }, [foods, totalCalories, goalCalories]);
  

  const addFood = () => {
    if (foodInput.trim() !== "" && caloriesInput.trim() !== "") {
      setFoods([
        ...foods,
        { food: foodInput, calories: parseFloat(caloriesInput) },
      ]);
      setTotalCalories(totalCalories + parseFloat(caloriesInput));
      setFoodInput("");
      setCaloriesInput("");
    }
  };

  const removeFood = (index) => {
    const newFoods = [...foods];
    setTotalCalories(totalCalories - newFoods[index].calories);
    newFoods.splice(index, 1);
    setFoods(newFoods);
  };

  const progressPercentage = Math.min(
    (totalCalories / goalCalories) * 100,
    100
  );

  return (
    <PageWrapper>
      <h2>Food Tracker</h2>
      <input
        type="text"
        value={foodInput}
        onChange={(e) => setFoodInput(e.target.value)}
        placeholder="Food"
      />
      <input
        type="number"
        value={caloriesInput}
        onChange={(e) => setCaloriesInput(e.target.value)}
        placeholder="Calories"
      />
      <button onClick={addFood}>Add</button>

      <h3>Eaten Today</h3>
      <ul>
        {foods.map((item, index) => (
          <li key={index} onClick={() => removeFood(index)}>
            {item.food} - {item.calories} calories
          </li>
        ))}
      </ul>

      <h3>Set Goal Calories</h3>
      <input
        type="number"
        value={goalCalories}
        onChange={(e) => setGoalCalories(e.target.value)}
        placeholder="Goal Calories"
      />

      <h4>Total Calories: {totalCalories}</h4>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            background: "lightgray",
            width: "100%",
            height: "30px",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              background: progressPercentage >= 100 ? "red" : "green",
              width: `${progressPercentage}%`,
              height: "100%",
              borderRadius: "5px",
            }}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default FoodTracker;
