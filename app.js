const express = require('express');
const app = express();
const serverConfig = require('./config/server.config');
const bodyParser = require('body-parser');
const db = require('./models');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

function init(){
    var categoriesData =[
        {name: "Electronics",
        description: "this category contains electrical appliances"},
        {name : "Vegetables",
        description : "This category contains vegetables"},
    ]
    var productsData = [
        {name: "Samsung",
        price : 1000},
    ]
    
    db.category.bulkCreate(categoriesData).then(()=>{
        console.log('category table is initialized with category data');
    }).catch((err)=>{
        console.log('Error in initializing categories table ',err);
    })
    db.product.bulkCreate(productsData).then(()=>{
        console.log(`category table is initialized with product data`);
    }).catch((err)=>{
        console.log("Error in initializing products table",err)
    })
   
}
db.category.hasMany(db.product);
db.sequelize.sync({force : true}).then(()=>{
    console.log('table drop and  recreated');
    init();
})



require('./routes/category.routes')(app);
require('./routes/product.routes')(app);
app.listen(serverConfig.PORT,()=>{
    console.log(`Server is running on Port ${serverConfig.PORT}`);
})