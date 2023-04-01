import React, { useState, useEffect } from "react";
import PageWrapper from "./PageWrapper";
import api from "../api";

const ExerciseTracker = () => {
  const [category, setCategory] = useState("Push");
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [exercises, setExercises] = useState({ Push: [], Pull: [], Legs: [] });
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditExercise = (exercise) => {
    setSelectedExercise(exercise);
    setCategory(category);
    setExerciseName(exercise.name);
    setSets(exercise.sets);
    setReps(exercise.reps);
    setIsEditMode(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteExercise = async (exerciseId) => {
    const updatedExercises = { ...exercises };
    updatedExercises[category] = updatedExercises[category].filter(
      (exercise, index) => index !== exerciseId
    );
    setExercises(updatedExercises);

    await updateBackend();
  };

  const fetchData = async () => {
    const response = await api.get("/exercises");
    const data = response.data;
    if (data.length > 0) {
      const exercisesData = data[0].data;
      setExercises(exercisesData);
    }
  };

  const updateBackend = async () => {
    await api.put(`/exercises`, {
      exercises,
    });
  };

  const handleAddExercise = async (e) => {
    e.preventDefault();

    const exercise = {
      name: exerciseName,
      sets: parseInt(sets),
      reps: parseInt(reps),
    };

    let newExercises;
    if (isEditMode) {
      const updatedCategoryExercises = exercises[category].map((ex) =>
        ex === selectedExercise ? exercise : ex
      );
      newExercises = { ...exercises, [category]: updatedCategoryExercises };
      setIsEditMode(false);
    } else {
      newExercises = {
        ...exercises,
        [category]: [...exercises[category], exercise],
      };
    }

    setExercises(newExercises);
    setExerciseName("");
    setSets("");
    setReps("");

    await updateBackend();
  };

  return (
    <PageWrapper>
      <h2>Exercise Tracker</h2>
      <form onSubmit={handleAddExercise}>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="radio"
            name="category"
            value="Push"
            checked={category === "Push"}
            onChange={(e) => setCategory(e.target.value)}
          />
          Push
          <input
            type="radio"
            name="category"
            value="Pull"
            checked={category === "Pull"}
            onChange={(e) => setCategory(e.target.value)}
          />
          Pull
          <input
            type="radio"
            name="category"
            value="Legs"
            checked={category === "Legs"}
            onChange={(e) => setCategory(e.target.value)}
          />
          Legs
        </div>
        <label htmlFor="exerciseName">Exercise Name:</label>
        <input
          type="text"
          id="exerciseName"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          required
        />
        <label htmlFor="sets">Sets:</label>
        <input
          type="number"
          id="sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          required
        />
        <label htmlFor="reps">Reps:</label>
        <input
          type="number"
          id="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
        />
        <button type="submit">Add Exercise</button>
      </form>

      <h3>Exercises:</h3>
      {["Push", "Pull", "Legs"].map((cat) => (
        <div key={cat}>
          <h4>{cat}</h4>
          <ul>
            {exercises[cat].map((exercise, index) => (
              <li key={index}>
                {exercise.name} - {exercise.sets} sets of {exercise.reps} reps
                <button
                  onClick={() => handleEditExercise(exercise)}
                  style={{
                    fontSize: "0.5em",
                    padding: "4px 8px",
                    marginRight: "8px",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteExercise(index)}
                  style={{ fontSize: "0.5em", padding: "4px 8px" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </PageWrapper>
  );
};

export default ExerciseTracker;
