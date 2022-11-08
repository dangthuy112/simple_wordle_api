const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController.js');

router.route('/')
    .get(usersController.getHistory)
    .put(usersController.updateHistory);

router.route('/:id')
    .get(usersController.getUser);

module.exports = router;