const categoryController = require('../controllers/category.controller');
const { requestValidator, authJwt } = require('../middleware');
module.exports = function(app){
    //Route for Post request to create the category
    app.post('/ecomm/api/v1/categories',[requestValidator.validateCategoryRequest, authJwt.verifyToken, authJwt.isAdmin],categoryController.create);

    // Route for Put request to update the category 
    app.put('/ecomm/api/v1/categories/:id',[requestValidator.validateCategoryRequest, authJwt.verifyToken, authJwt.isAdmin], categoryController.update);

    //Route for Delete request to delete the category
    app.delete('/ecomm/api/v1/categories/:id', [ authJwt.verifyToken, authJwt.isAdmin],categoryController.delete);

    //route for Get request to Find the  Category by Id;
    app.get('/ecomm/api/v1/categories/:id',categoryController.findOne);

    //route for Get request to Find the all Categories;
    app.get('/ecomm/api/v1/categories',categoryController.findAll);

}