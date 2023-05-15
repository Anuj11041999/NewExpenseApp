const Expense = require('../models/expense');

exports.getExpenses = async (req, res, next) => {
  try {
    console.log('yes1');
    const expenses = await Expense.findAll();
    console.log('fetched');
    res.json(expenses);
  } catch (err) {
    console.log(err);
  }
};

exports.addExpense = async (req, res, next) => {
  try {
    const { amount, description, category } = req.body;
    const expense = await Expense.create({
      amount: amount,
      description: description,
      category: category,
    });
    console.log('inserted');
    res.json({
      id: expense.id,
      amount: amount,
      description: description,
      category: category,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    if (req.params.id === 'undefined') {
      console.log('ID missing');
      return res.status(400).json({ err: 'ID missing' });
    }
    const uId = req.params.id;
    const result = await Expense.destroy({ where: { id: uId } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.postEditExpense = async (req, res, next) => {
  try {
    if (req.params.id === 'undefined') {
      console.log('ID missing');
      return res.status(400).json({ err: 'ID missing' });
    }
    const updatedAmount = req.body.amount;
    const updatedDescription = req.body.description;
    const updatedCategory = req.body.category;
    const expenseId = req.params.id;
    const expense = await Expense.findByPk(expenseId);
    expense.amount = updatedAmount;
    expense.description = updatedDescription;
    expense.category = updatedCategory;
    await expense.save();
    console.log('Updated');
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
