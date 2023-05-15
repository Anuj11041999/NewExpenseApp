const express = require('express');
const bodyParser = require('body-parser');
const Expense = require('./models/expense');

const app = express();
const cors = require('cors');
const sequelize = require('./util/database');
const User = require('./models/user');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');

app.use(cors());
app.use(bodyParser.json({extended:false}));
app.use(userRoutes);
app.use(expenseRoutes);

// User.hasMany(Expense);
// Expense.belongsTo(User);
sequelize
    .sync()
    .then(result=>{
        app.listen(3000)
    })
    .catch(err=>{
        console.log(err)
    });
