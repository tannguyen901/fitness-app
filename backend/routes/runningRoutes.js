const express = require('express');
const router = express.Router();
const runningController = require('../controllers/runningController');

router.get('/', runningController.getRuns);
router.post('/', runningController.updateRuns);

module.exports = router;
