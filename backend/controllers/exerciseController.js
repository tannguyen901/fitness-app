const Exercise = require('../models/Exercise');

exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateExercises = async (req, res) => {
  try {
    await Exercise.updateOne({}, { data: req.body.exercises }, { upsert: true });
    res.json({ message: 'Exercises updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
