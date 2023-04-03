const Exercise = require('../models/Exercise');

exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createExercise = async (req, res) => {
  const { exercises } = req.body;

  try {
    const newExercises = new Exercise({ Push: [], Pull: [], Legs: [] });

    await newExercises.save();

    res.status(201).json(newExercises);
  } catch (error) {
    res.status(400).json({ message: 'Error creating exercise data' });
  }
};


exports.updateExercises = async (req, res) => {
  const id = req.params.id; // Get the _id from the request parameters
  const { exercises } = req.body;

  try {
    // Find the exercise document by _id and update it
    const updatedExercises = await Exercise.findByIdAndUpdate(id, { exercises }, { new: true });

    if (!updatedExercises) {
      return res.status(404).send({ message: 'Exercise not found' });
    }

    res.status(200).send(updatedExercises);
  } catch (error) {
    res.status(500).send({ message: 'Error updating exercises' });
  }
};

