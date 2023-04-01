const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  data: [
    {
      food: String,
      calories: Number,
    },
  ],
  totalCalories: Number,
  goalCalories: Number,
});

module.exports = mongoose.model('Food', FoodSchema);
