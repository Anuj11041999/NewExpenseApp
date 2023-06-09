const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const forgotPassword = sequelize.define('forgotPasswordRequests',{
    id:{
        type:Sequelize.UUID,
        allowNull:false,
        primaryKey:true
    },
    active:Sequelize.BOOLEAN,
    expiresby:Sequelize.DATE
})

module.exports = forgotPassword