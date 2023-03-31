const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data');

router.get('/data', dataController.getData);
router.post('/data', dataController.updateData);

module.exports = router;
