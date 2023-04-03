const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

// Get a user's exercise data
router.get('/', exerciseController.getExercises);

// Update an existing exercise entry
router.put('/:id', exerciseController.updateExercises);

router.post('/', exerciseController.createExercise);

module.exports = router;
