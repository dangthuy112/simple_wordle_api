const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController.js');

router.route('/')
    .put(usersController.updateUser);

router.route('/:id')
    .get(usersController.getUser);

module.exports = router;