const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.json');

const env = "development";
const dbSetting = dbConfig[env];

const sequelize = new Sequelize(
    dbSetting.database,
    dbSetting.username,
    dbSetting.password,
    dbSetting.dialectInformation
)
sequelize.authenticate().then(()=>{
    console.log('Connection established successfully.')

}).catch(err =>{
    console.error('Unable to connect to the database :',err);
})

const db = { Sequelize, sequelize };
db.category = require('./category.model')(sequelize,Sequelize);
db.product = require('./product.model')(sequelize,Sequelize)
module.exports = db;
