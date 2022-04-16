const { response } = require('express');
const db = require('../models');
const Product = db.product;

//create and save a new product

exports.create = (req,res) =>{

    //creating the product object to be stored in db

    const product = {
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        categoryId: req.body.categoryId
    }

    // storing the product object in db

    console.log("*****we are here in product controller for create****",Product);
    Product.create(product).then(response =>{
        console.log(`product: [${response}got inserted in db]`);
        res.status(201).send(response);
    }).catch(err =>{
        console.log(`product: [${err} not inserted in db]`);
        res.status(500).send({
            message : "some internal error occurred while string the products data!"
        });
    })
}

//Update an existing product

exports.update = (req, res) =>{
    
    // creating the product object to be updated in db

    const product = {
        name : req.body.name,
        description : req.body.description,
        price : req.body.price
    }
    const productId = req.params.id;
    Product.update(product, {
        where : {id:productId}
    }).then(response =>{
        console.log(product,productId);
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message: "Some internal error occurred while updating the product data!"
        })
    });
}

// Deleting the Product 

exports.delete = (req, res) =>{

    const productId = req.params.id;
    Product.destroy({
        where: {
            id: productId
        },
        returning : true
    }).then(response =>{
        res.sendStatus(200).send(response);
    }).catch(err =>{
        res.sendStatus(500).send({
            message: "Some internal error occurred while deleting the product!"
        })
    });
}

// Get a product information based upon the product id

exports.findOne = (req, res) =>{

    const productId = req.params.id;
    Product.findByPk(productId).then(response =>{
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message: "Some internal error occurred while fetching the product !"
        })
    });
}


// Get the all products 

exports.findAll = (req, res) =>{
    
    let productName = req.query.name;
    let promise;
    if(productName){
        promise = Product.findAll({
            where: {
                name : productName
            }
        });
    }
    else{
        promise = Product.findAll();
    }
    promise.then(response =>{
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message : "Some internal error occurred while fetching all Products"
        })
    });
}

// Get the product Under the Category

exports.getProductsUnderCategory = (req, res) =>{
    
    const categoryID = req.params.categoryId;
    Product.findAll({
        where :{
            categoryId : categoryID
        }
    }).then(response =>{
        res.status(200).send(response);
    }).catch(err =>{
        console.log(err);
        res.status(500).send({
            message : "Some internal error occurred while fetching all products based upon the category id"
        })
    })
}