const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  foods: { type: Array, default: [] },
  totalCalories: { type: Number, default: 0 },
  goalCalories: { type: Number, default: 2000 },
  runs: { type: Array, default: [] },
  kmRan: { type: Number, default: 0 },
  goalKm: { type: Number, default: 10 },
  exercises: {
    type: Object,
    default: { push: [], pull: [], legs: [] },
  },
  bmiResult: { type: Object, default: null },
});

module.exports = mongoose.model('UserData', userDataSchema);
