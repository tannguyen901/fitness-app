const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  data: {
    Push: [
      {
        name: String,
        sets: Number,
        reps: Number,
      },
    ],
    Pull: [
      {
        name: String,
        sets: Number,
        reps: Number,
      },
    ],
    Legs: [
      {
        name: String,
        sets: Number,
        reps: Number,
      },
    ],
  },
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
