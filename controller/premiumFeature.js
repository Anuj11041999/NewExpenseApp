const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');
const e = require('express');

const getUserLeaderBoard = async (req, res) => {
    try{
        const leaderboard = await User.findAll({
            order:[['totalexpense', 'DESC']]

        })
        res.status(200).json(leaderboard)
    
} catch (err){
    console.log(err)
    res.status(500).json(err)
}
}

module.exports = {
    getUserLeaderBoard
}