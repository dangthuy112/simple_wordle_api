const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController.js');

router.route('/history')
    .put(usersController.updateHistory);

router.route('/history/:id')
    .get(usersController.getHistory)

module.exports = router;