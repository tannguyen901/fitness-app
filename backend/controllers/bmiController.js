const BmiData = require('../models/BmiData');

exports.getBmiData = async (req, res) => {
  const bmiData = await BmiData.findOne();
  if (bmiData) {
    res.json({ bmiData });
  } else {
    res.json({ bmiData: null });
  }
};


exports.updateBmiData = async (req, res) => {
  if (!req.body.bmiData) {
    return res.status(400).send('BMI data is not provided');
  }
  await BmiData.findOneAndUpdate({}, req.body.bmiData, { upsert: true });
  res.status(200).send('BMI data updated');
};

