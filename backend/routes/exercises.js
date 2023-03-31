const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");

router.get("/", exerciseController.getAllExercises);
router.post("/", exerciseController.addExercise);
router.delete("/:id", exerciseController.deleteExercise);
// Add other exercise-related routes as needed.

module.exports = router;
