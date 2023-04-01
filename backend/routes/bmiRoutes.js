const express = require('express');
const router = express.Router();
const { getBmiData, updateBmiData } = require('../controllers/bmiController');

router.get('/', getBmiData);
router.put('/', updateBmiData);

module.exports = router;
