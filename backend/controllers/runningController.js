const Run = require('../models/Run');

exports.getRuns = async (req, res) => {
  try {
    const runs = await Run.findOne();
    res.json({ runs: runs.data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRuns = async (req, res) => {
  try {
    const runs = await Run.findOneAndUpdate({}, { data: req.body });
    res.json({ message: 'Runs updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
