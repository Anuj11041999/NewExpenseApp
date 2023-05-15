const controller = require('../controller/expense')
const express = require('express');

const router = express.Router();

router.get('/expense',controller.getExpenses);
router.post('/expense/add',controller.addExpense);
router.delete('/delete/:id',controller.deleteExpense);
router.post('/edit/:id',controller.postEditExpense);

module.exports = router;