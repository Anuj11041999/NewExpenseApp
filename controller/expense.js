const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database');

const addexpense = async (req, res) => {
    const t = await sequelize.transaction();
    try{
        const { amount, description, category } = req.body;

    if(amount == undefined || amount.length === 0 ){
        return res.status(400).json({success: false, message: 'Parameters missing'})
    }
    const expense = await Expense.create({ amount, description, category, userId: req.user.id},{transaction:t})
        const totalexpense = req.user.totalexpense + Number(amount)
        const user = await User.update({
            totalexpense:totalexpense
        },{
            where:{id:req.user.id},
            transaction:t
        })
    
        await t.commit();
        res.status(200).json({expense, success: true } );
    }catch(err) {
        t.rollback();
        return res.status(500).json({success : false, error: err})
    }
}

const getexpenses = (req, res)=> {
    
    Expense.findAll({ where : { userId: req.user.id}}).then(expenses => {
        return res.status(200).json({expenses, success: true})
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({ error: err, success: false})
    })
}

const deleteexpense = async (req, res) => {
    const t = await sequelize.transaction();
    try{
        const expenseid = req.params.expenseid;
    if(expenseid == undefined || expenseid.length === 0){
        return res.status(400).json({success: false, })
    }
    const expense = await Expense.destroy({where: { id: expenseid, userId: req.user.id }},{transaction:t})
    const totalexpense = req.user.totalexpense - Number(rows.amount);
    const user = User.update({
            totalexpense:totalexpense
        },{
            where :{id:req.user.id},
            transaction:t
        })
            await t.commit();
            return res.status(200).json({ success: true, message: "Deleted Successfuly"});
        if(rows === 0){
            t.rollback();
            return res.status(404).json({success: false, message: 'Expense doenst belong to the user'})
        }
    }catch(err){
        t.rollback();
        return res.status(500).json({ success: true, message: "Failed"})
    }
}

module.exports = {
    deleteexpense,
    getexpenses,
    addexpense
}