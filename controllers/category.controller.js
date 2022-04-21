const db = require('../models');
const Category = db.category;

//create and save a new category

exports.create =(req,res) =>{

    //creating the category object to be stored in db
    const category = {
        name : req.body.name,
        description : req.body.description
    }

    //storing the category obejct in db
    Category.create(category).then(response =>{
        console.log(`category: [${response} got inserted in db]` );
        res.status(201).send(response);
    }).catch(err =>{
        console.log(`category [${err} not inserted in db ]`);
        res.status(500).send({
            message: "Some internal error occurred while storing the category data!"
        })
    })
}

//Update an Existing category

exports.update = (req,res) =>{

    //creating the category object ot be updated in db

    const category = {
        name : req.body.name,
        description : req.body.description
    }
    const categoryId = req.params.id;
    Category.update(category,{
        where:{id:categoryId}
    }).then(response =>{
        console.log(category,categoryId);
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message: "Some internal error occurred while updating the category data !"
        })
    });
};

//Dalete a Category 

exports.delete = (req, res) =>{
    
    //deleting the category by id
    const categoryId = req.params.id;
    Category.destroy({
        where: {
            id: categoryId
        }
    }).then(response =>{
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message: "Some internal error occurred while deleting the category!"
        })
    });
}

// Get a category informatio base upon the category id

exports.findOne = (req, res) =>{
    const categoryId = req.params.id;
    Category.findByPk(categoryId).then(response =>{
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message: "Some internal error occurred while fetching category based by upon categoryId!"
        })
    })
}

// Get the all Category information

exports.findAll = (req, res) =>{
    let categoryName = req.query.name;
    let promise;
    if(categoryName){
        promise = Category.findAll({
            where:{
                name : categoryName
            }
        })
    }
    else{
        promise = Category.findAll();
    }
    promise.then(response =>{
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message: "Some internal error occurred while fetching all the categories !"
        })
    })
}