const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.get('/', foodController.getFoods);
router.post('/', foodController.updateFoods);

module.exports = router;
