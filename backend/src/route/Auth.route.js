const express           = require('express');
const authController    = require('../controller/Auth.controller');
const router            = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
// router.post('/logout', authController.logout);
// router.get('/reset-password/{toekn}', authController.resetPassword);

module.exports = router;
