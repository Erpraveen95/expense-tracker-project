const sequelize = require('../util/database')
const Sequelize = require('sequelize')

const User =  sequelize.define("expense-data",{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING
    }
    
})
module.exports = User