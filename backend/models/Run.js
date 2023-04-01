const mongoose = require('mongoose');

const RunSchema = new mongoose.Schema({
  date: String,
  distance: Number,
});

module.exports = mongoose.model('Run', RunSchema);
