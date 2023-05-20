const express = require('express');

const resetPasswordController = require('../controller/password');

const router = express.Router();

router.get('/updatepassword/:id',resetPasswordController.updatePassword);
router.get('/resetpassword/:id',resetPasswordController.resetPassword);
router.post('/forgotpassword',resetPasswordController.forgotPassword);

module.exports = router;