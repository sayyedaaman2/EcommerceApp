module.exports = (sequelize, Sequelize) =>{
    
    const Cart = sequelize.define("cart", {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        const:{
            type: Sequelize.INTEGER
        }
    }, {
        tableName : "carts"
    });
    return Cart;
}