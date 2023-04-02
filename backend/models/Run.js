const mongoose = require('mongoose');

const RunSchema = new mongoose.Schema({
  data: [
    {
      date: String,
      distance: Number,
    },
  ],
  weeklyGoal: Number,
  weeklyDistance: Number,
  kmRan: Number,
  goalKm: Number,
});

module.exports = mongoose.model('Run', RunSchema);
