const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");

router.get("/", foodController.getAllFoods);
router.post("/", foodController.addFood);
router.delete("/:id", foodController.deleteFood);
// Add other food-related routes as needed.

module.exports = router;
