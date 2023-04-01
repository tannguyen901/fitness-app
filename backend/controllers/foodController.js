const Food = require("../models/Food");

exports.getFoods = async (req, res) => {
  try {
    const foodData = await Food.findOne();

    if (!foodData) {
      const newFoodData = new Food({
        data: [],
        totalCalories: 0,
        goalCalories: 2000,
      });
      await newFoodData.save();
      res.json(newFoodData);
    } else {
      res.json(foodData);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFoods = async (req, res) => {
  try {
    await Food.findOneAndUpdate(
      {},
      {
        data: req.body.foods,
        totalCalories: req.body.totalCalories,
        goalCalories: req.body.goalCalories,
      }
    );
    res.json({ message: "Foods updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
