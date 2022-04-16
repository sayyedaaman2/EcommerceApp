const productController = require('../controllers/products.controller');

module.exports = function(app){

    //Route for POST request to create the product
    app.post('/ecomm/api/v1/products', productController.create);

    //Route for PUT request to update the product
    app.put('/ecomm/api/v1/products/:id', productController.update);

    //Route for DELETE request to delete the product
    app.delete('/ecomm/api/v1/products/:id', productController.delete);

    //Route for GET request to get the product by Primarykey (Id)
    app.get('/ecomm/api/v1/products/:id', productController.findOne);

    //Route for GET request to get all products
    app.get('/ecomm/api/v1/products', productController.findAll);

    //Route for GET request to get the all the products of the given category id
    app.get('/ecomm/api/v1/categories/:categoryId/products', productController.getProductsUnderCategory);
    
}