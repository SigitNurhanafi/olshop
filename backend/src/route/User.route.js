const express           = require('express');
const userController    = require('../controller/User.controller');
const router            = express.Router();

router.get('/:userId', userController.getUserById);

module.exports = router;
