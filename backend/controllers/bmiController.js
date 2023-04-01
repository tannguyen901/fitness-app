const BmiData = require('../models/BmiData');

exports.getBmiData = async (req, res) => {
  const bmiData = await BmiData.findOne();
  res.json({ bmiData });
};

exports.updateBmiData = async (req, res) => {
  await BmiData.findOneAndUpdate({}, req.body.bmiData, { upsert: true });
  res.status(200).send('BMI data updated');
};
