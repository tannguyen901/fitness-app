const mongoose = require('mongoose');

const BmiDataSchema = new mongoose.Schema({
  bmi: Number,
  health: String,
});

module.exports = mongoose.model('BmiData', BmiDataSchema);
