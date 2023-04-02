const Run = require('../models/Run');

exports.getRuns = async (req, res) => {
  try {
    const runs = await Run.findOne();
    res.json(runs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRuns = async (req, res) => {
  try {
    const { data, weeklyGoal, weeklyDistance, kmRan, goalKm } = req.body;
    await Run.findOneAndUpdate(
      {},
      { data, weeklyGoal, weeklyDistance, kmRan, goalKm },
      { upsert: true, new: true }
    );
    res.json({ message: 'Runs updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};