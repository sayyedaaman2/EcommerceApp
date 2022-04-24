const Models = require('../../../models');
const productsController = require('../../../controllers/products.controller');
const { mockRequest, mockResponse } = require('../interceptor');
const newProduct = require('../mockData/newProduct.json');
const { product } = require('../../../models');

Product = Models.product;
let req, res;
beforeEach(()=>{
    req = mockRequest();
    res = mockResponse();
})


describe('tests for ProductController.create',()=>{

    beforeEach(()=>{
        req.body = newProduct
    });

    it('it should call productController.create and create a new Products in db successfully', async()=>{
        const expectedResponse = {
            ...newProduct,
            categoryId : 1
        }
        const spyOnCreate = jest.spyOn(Product, 'create').mockImplementation((newProduct)=>Promise.resolve(expectedResponse));

        await productsController.create(req,res);

        expect(spyOnCreate).toHaveBeenCalled();
        expect(Product.create).toHaveBeenCalled();
        expect(Product.create).toHaveBeenCalledWith(newProduct);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(expectedResponse);
    });

    it('it should call productCtonroller.create and return an error',async()=>{
        const spyOnCreate = jest.spyOn(Product,'create').mockImplementation(()=> Promise.reject(Error('This a error')));
        await productsController.create(req,res);

        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(Product.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({
            message : "some internal error occurred while string the products data!"
        });
    });
});

describe('tests for productController.update',()=>{
    beforeEach(()=>{
        req.body = newProduct;
        req.params = {
            id:1
        }
    })

    it ('it should call categoryController.update and update category in db', async()=>{
        const spyOnUpdate = jest.spyOn(Product, 'update').mockImplementation((newProduct)=> Promise.resolve(newProduct));
        await productsController.update(req,res);

        await expect(spyOnUpdate).toHaveBeenCalled();
        await expect(Product.update).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(newProduct);
    });

    it('it should call productController.update and error is thrown',async()=>{
        const spyOnUpdate = jest.spyOn(Product,'update').mockImplementation(()=>Promise.reject());
        await productsController.update(req,res);
        
        await expect(spyOnUpdate).toHaveBeenCalled();
        await expect(Product.update).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occurred while updating the product data!"
        });
    });
});

describe('test for productController.findOne',()=>{

    beforeEach(()=>{
        req.params = {
            id : 1
        }
    });

    it('it should call productController.findOne and return the product',async()=>{
        const spyOnFindByPk = jest.spyOn(Product,'findByPk').mockImplementation(()=> Promise.resolve(newProduct));
        await productsController.findOne(req,res);
        
        await expect(spyOnFindByPk).toHaveBeenCalled();
        await expect(Product.findByPk).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(newProduct);
    });

    it('it should call productController.findOne and return the error',async()=>{
        const spyOnFindByPk = jest.spyOn(Product,'findByPk').mockImplementation(()=>Promise.reject(Error('This is an error')));
        await productsController.findOne(req,res);

        await expect(spyOnFindByPk).toHaveBeenCalled();
        await expect(Product.findByPk).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occurred while fetching the product !"
        });
    });
});

describe('tests for productsController.delete',()=>{

    beforeEach(()=>{
        req.params ={
            id:1
        }
    });
    it('it should call productsController.delete', async() =>{
        const spyOnDestroy = jest.spyOn(Product, 'destroy').mockImplementation(()=> Promise.resolve("Successfully Deleted"));
        await productsController.delete(req, res);
        
        await expect(spyOnDestroy).toHaveBeenCalled();
        await expect(Product.destroy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith("Successfully Deleted");
    });

    it('it should call productsController.delete and return the error', async()=>{
        const spyOnDestroy = jest.spyOn(Product, 'destroy').mockImplementation(()=>Promise.reject(Error("This is an error")));
        await productsController.delete(req, res);

        await expect(spyOnDestroy).toHaveBeenCalled();
        await expect(Product.destroy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occurred while deleting the product!"
        });
    });
});

describe('tests for productsController.findAll',()=>{

    it('it should call prodcutsControllers.findAll with empty qurey param and return all the products', async()=>{
        const spyOnFindAll = jest.spyOn(Product,'findAll').mockImplementation(()=> Promise.resolve(newProduct));
        await productsController.findAll(req,res);

        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(Product.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(newProduct);
    });

    it('it should call productsController.findAll with some query params and return all the products', async()=>{
        req.query = {
            name: "Samsung"
        }
        const queryParam = {
            where : {
                name: "Samsung"
            }
        }

        const spyOnFindAll = jest.spyOn(Product,'findAll').mockImplementation((queryParam)=>Promise.resolve(newProduct));
        await productsController.findAll(req,res);
        
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(Product.findAll).toHaveBeenCalledWith(queryParam);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(newProduct);
    });

    it('it should call products.find for Bad request ', async()=>{
        req.query = {
            name : "Samsung"
        }
        const spyOnFindAll = jest.spyOn(Product, 'findAll').mockImplementation(()=>Promise.reject(Error("this is new error")));
        await productsController.findAll(req, res);

        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(Product.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({
            message : "Some internal error occurred while fetching all Products"
        });
    });
});