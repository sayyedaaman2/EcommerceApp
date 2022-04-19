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
db.product = require('./product.model')(sequelize,Sequelize);
db.user = require('./user.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize,Sequelize);
db.cart = require('./cart.model')(sequelize, Sequelize);

//Relation between Role and User

db.role.belongsToMany(db.user,{
    through: "user_roles",
    foreignKey : "roleId",
    otherKey : "userId"
});
db.user.belongsToMany(db.role,{
    through : "user_roles",
    foreignKey : "userId",
    otherKey : "roleId"
})

db.ROLES = ["customer", "admin"];

//Realtionship between Cart and User : 1user has many carts

db.user.hasMany(db.cart);

//Relationship between Cart and Products : Many-to- Many

db.product.belongsToMany(db.cart, {
    through : "cart_products",
    foreignKey : "productId",
    otherKey : "cartId"
});

db.cart.belongsToMany(db.product, {
    through : "cart_products",
    foreignKey : "cartId",
    otherKey : "productId"
});

module.exports = db;
