const UserData = require('../models/userData');

// Replace this with a real user ID in your app
const userId = 'defaultUser';

exports.getData = async (req, res) => {
  const data = await UserData.findOne({ userId });
  if (!data) {
    const newData = new UserData({ userId });
    await newData.save();
    res.json(newData);
  } else {
    res.json(data);
  }
};

exports.updateData = async (req, res) => {
  const updatedData = req.body;
  const data = await UserData.findOneAndUpdate(
    { userId },
    { $set: updatedData },
    { new: true }
  );
  res.json(data);
};
