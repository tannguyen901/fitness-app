import React, { useState, useEffect } from "react";
import PageWrapper from "./PageWrapper";
import api from "../api";

const ExerciseTracker = () => {
  const [category, setCategory] = useState("Push");
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [exercises, setExercises] = useState({
    _id: "",
    Push: [],
    Pull: [],
    Legs: [],
  });
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditExercise = (exercise, category) => {
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

    // Await for exercises state to be updated before calling updateBackend
    await updateBackend(updatedExercises);
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/exercises");
      const data = response.data;
      if (data && data.length > 0) {
        const exercisesData = {
          _id: data[0]._id,
          Push: data[0].Push || [],
          Pull: data[0].Pull || [],
          Legs: data[0].Legs || [],
        };
        setExercises(exercisesData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateBackend = async (newExercises) => {
    const id = newExercises._id;
    if (id) {
      await api.put(`/exercises/${id}`, {
        exercises: {
          Push: newExercises.Push,
          Pull: newExercises.Pull,
          Legs: newExercises.Legs,
        },
      });
    } else {
      const response = await api.post("/exercises", {
        exercises: {
          Push: newExercises.Push,
          Pull: newExercises.Pull,
          Legs: newExercises.Legs,
        },
      });
      setExercises({ ...response.data, _id: response.data._id });
    }
  };

  const handleAddExercise = async (e) => {
    e.preventDefault();

    const exercise = {
      name: exerciseName,
      reps: parseInt(reps),
      sets: parseInt(sets),
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

    // Pass newExercises to updateBackend
    await updateBackend(newExercises);
  };

  return (
    <PageWrapper>
      <h2></h2>
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
                  onClick={() => handleEditExercise(exercise, cat)}
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
