const express = require('express');

const userController = require('../controller/user');
// const expenseController = require('../controller/expenseController');

// const authenticationM = require('../middleware/authentication');

const router = express.Router();

router.post('/signup',userController.signup);
router.post('/login',userController.login);
// router.post('/addExpense',userController.addExpense);
// router.get('getExpense',userController.getExpense);

module.exports = router;
