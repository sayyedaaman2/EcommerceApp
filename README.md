# EcommerceApp
This project is node.js back-end code for a Ecommerce App
application that can create various entities like
users, user's roles, category, products, carts as well as perform various actions on them.
In application we are using the Relation Database MySQL

***
## Requirements
- node.js [link](https://nodejs.org/en/)
- MySql Community Server [link](https://dev.mysql.com/downloads/mysql/)
- PostMan [link](https://www.postman.com/downloads/) calling the API


## Installation
```sh
cd EcommerceApp
npm install
npm start
```

<br/>

## Features

>**Users**
- You can create accounts for Customer and Admin.
- when we are providing the user's roles "customer", "admin".
- user can have multiple roles.
- user can signUp/SignIn


>**Category**
- The one Category has many products 
- One to Many relationship
- Category contains  id , name and description.

>**Products**
- The one product has many carts
- One to Many relationship
- Product contains id , name , description , price.

>**Cart**
- The One Cart has many products.
- One to Many relationship.
- Cart contains id and cost of total products.
***

## Dependencies
|node modules|
|-|
|express|
|body-parser|
|sequelize|
|mysql2|
|bcrypt|
|jsonwebtoken|

# DevDependencies
|node modules|
|-|
|jest|

<br/>

### REST API endpoints

## 1.1 SignUp default for Customer
```sh
POST /ecomm/api/v1/auth/signup

sample request body :
{
    "username" : "test1",
    "email" : "test1@gmail.com",
    "password" : "test1234"
}

sample response body : 
{
    "message": "user registered successfully !"
}

```

---

## 1.2 SignUp ADMIN
```sh
POST /ecomm/api/v1/auth/signup

sample request body :
{
    "username" : "admin",
    "email" : "admin01@gmail.com",
    "password" : "test1234",
    "roles" : ["admin"]
}

sample response body : 
{
    "message": "user registered successfully!"
}

```

---

## 3. Login
```sh
POST /ecomm/api/v1/auth/signin

sample request body :
{
    "username" : "admin",
    "password" : "test1234"
}

sample response body : 
{
    "id": 2,
    "username": "admin",
    "email": "admin01@gmail.com",
    "roles": [
        "ROLE_ADMIN"
    ],
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY0MjYzNTM3LCJleHAiOjE2NjQzNDk5Mzd9.W3fpa7T4iNLAKahdNQ6VWc1-Uqt8UcRp9dGGg17Yims"
}
```

---

## 4. Create a Category
```sh
POST /ecomm/api/v1/categories


Headers : 
 Content-Type : application/json
 x-access-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY0MjYzNTM3LCJleHAiOjE2NjQzNDk5Mzd9.W3fpa7T4iNLAKahdNQ6VWc1-Uqt8UcRp9dGGg17Yims

sample request body :
{
    "name" : "kitcthen",
    "description" : "kitcthen applicances and tools"
}

sample response body : 
{
    "id": 3,
    "name": "kitcthen",
    "description": "kitcthen applicances and tools",
    "updatedAt": "2022-09-27T07:29:07.207Z",
    "createdAt": "2022-09-27T07:29:07.207Z"
}
```

---

## 5. Update a Category
```sh
PUT /ecomm/api/v1/categories/:id

Headers : 
 Content-Type : application/json
 x-access-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY0MjYzNTM3LCJleHAiOjE2NjQzNDk5Mzd9.W3fpa7T4iNLAKahdNQ6VWc1-Uqt8UcRp9dGGg17Yims

Parameters : id : 3
sample request body :
{
    "name" : "kitchen",
    "description" : "kitchen applicances and tools"
}

sample response body : 
[
    1
]
```

---

## 6. Delete a Category
```sh
DELETE /ecomm/api/v1/categories/:id

Headers : 
 Content-Type : application/json
 x-access-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY0MjYzNTM3LCJleHAiOjE2NjQzNDk5Mzd9.W3fpa7T4iNLAKahdNQ6VWc1-Uqt8UcRp9dGGg17Yims

Parameters : id : 3
sample request body : {}

sample response body : 
OK
```

---

## 7. Get by Id Category
```sh
GET /ecomm/api/v1/categories/:id

Parameters : id : 2
sample request body : {}

sample response body : 
{
    "id": 2,
    "name": "Vegetables",
    "description": "This category contains vegetables",
    "createdAt": "2022-09-27T07:34:27.000Z",
    "updatedAt": "2022-09-27T07:34:27.000Z"
}
```

---

## 8.1 Get by Name Category
```sh
GET /ecomm/api/v1/categories?name=Vegetables

queryparams : name : Vegetables
sample request body : {}

sample response body : 
{
    "id": 2,
    "name": "Vegetables",
    "description": "This category contains vegetables",
    "createdAt": "2022-09-27T07:34:27.000Z",
    "updatedAt": "2022-09-27T07:34:27.000Z"
}
```

---


## 8.2 Get All Category
```sh
GET /ecomm/api/v1/categories

sample request body : {}

sample response body : 
[
    {
        "id": 1,
        "name": "Electronics",
        "description": "this category contains electrical appliances",
        "createdAt": "2022-09-27T07:34:27.000Z",
        "updatedAt": "2022-09-27T07:34:27.000Z"
    },
    {
        "id": 2,
        "name": "Vegetables",
        "description": "This category contains vegetables",
        "createdAt": "2022-09-27T07:34:27.000Z",
        "updatedAt": "2022-09-27T07:34:27.000Z"
    }
]
```

---

## 9. Create a Product
```sh
POST /ecomm/api/v1/products


Headers : 
 Content-Type : application/json
 x-access-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY0MjYzNTM3LCJleHAiOjE2NjQzNDk5Mzd9.W3fpa7T4iNLAKahdNQ6VWc1-Uqt8UcRp9dGGg17Yims

sample request body :
{
    "name" : "Iphone xr",
    "description" : "Big Screen best Proccessor fantastic look",
    "price" : 49000,
    "categoryId": 1
}
sample response body : 
{
    "id": 2,
    "name": "Iphone xr",
    "description": "Big Screen best Proccessor fantastic look",
    "price": 49000,
    "categoryId": 1,
    "updatedAt": "2022-09-27T07:42:15.941Z",
    "createdAt": "2022-09-27T07:42:15.941Z"
}
```

---


## 10. Update a Product
```sh
PUT /ecomm/api/v1/products/:id


Headers : 
 Content-Type : application/json
 x-access-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY0MjYzNTM3LCJleHAiOjE2NjQzNDk5Mzd9.W3fpa7T4iNLAKahdNQ6VWc1-Uqt8UcRp9dGGg17Yims

parameters : id : 2

sample request body :
{
    "name" : "Iphone xr",
    "description" : " best Proccessor fantastic look",
    "price" : 49000,
    "categoryId" : 1
}
sample response body : 
{
    1
}
```

---

## 11. Delete a Product
```sh
DELETE /ecomm/api/v1/products/:id

Headers : 
 Content-Type : application/json
 x-access-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY0MjYzNTM3LCJleHAiOjE2NjQzNDk5Mzd9.W3fpa7T4iNLAKahdNQ6VWc1-Uqt8UcRp9dGGg17Yims

Parameters : id : 3
sample request body : {}

sample response body : 
OK
```

---


## 12. Get a single Product
```sh
GET /ecomm/api/v1/products/:id

Parameters : id : 3
sample request body : {}

sample response body : 
{
    "id": 3,
    "name": "Iphone xr",
    "description": "Big Screen best Proccessor fantastic look",
    "price": 49000,
    "createdAt": "2022-09-27T07:48:19.000Z",
    "updatedAt": "2022-09-27T07:48:19.000Z",
    "categoryId": 1
}
```

---

## 13. Get all  Products
```sh
GET /ecomm/api/v1/products

sample request body : {}

sample response body : 
[
    {
        "id": 3,
        "name": "Iphone xr",
        "description": "Big Screen best Proccessor fantastic look",
        "price": 49000,
        "createdAt": "2022-09-27T07:48:19.000Z",
        "updatedAt": "2022-09-27T07:48:19.000Z",
        "categoryId": 1
    },
    {
        "id": 4,
        "name": "Iphone xr",
        "description": "Big Screen best Proccessor fantastic look",
        "price": 49000,
        "createdAt": "2022-09-27T07:50:17.000Z",
        "updatedAt": "2022-09-27T07:50:17.000Z",
        "categoryId": 1
    }
]
```

---


## 14. Get all  Products in Category
```sh
GET /ecomm/api/v1/categories/:categoryId/products

Path Variables : 
    categoryId : 1

sample request body : {}

sample response body : 
[
    {
        "id": 3,
        "name": "Iphone xr",
        "description": "Big Screen best Proccessor fantastic look",
        "price": 49000,
        "createdAt": "2022-09-27T07:48:19.000Z",
        "updatedAt": "2022-09-27T07:48:19.000Z",
        "categoryId": 1
    },
    {
        "id": 4,
        "name": "Iphone xr",
        "description": "Big Screen best Proccessor fantastic look",
        "price": 49000,
        "createdAt": "2022-09-27T07:50:17.000Z",
        "updatedAt": "2022-09-27T07:50:17.000Z",
        "categoryId": 1
    }
]
```

---

## 15. Create a Cart
```sh
POST /ecomm/api/v1/carts


Headers : 
 Content-Type : application/json
 x-access-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY0MjYzNTM3LCJleHAiOjE2NjQzNDk5Mzd9.W3fpa7T4iNLAKahdNQ6VWc1-Uqt8UcRp9dGGg17Yims

sample request body : {}
sample response body : 
{
    "id": 1,
    "userId": 1,
    "updatedAt": "2022-09-27T07:54:16.659Z",
    "createdAt": "2022-09-27T07:54:16.659Z"
}
```

---

## 16. Update a Cart
```sh
POST /ecomm/api/v1/carts/:id


Headers : 
 Content-Type : application/json
 x-access-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY0MjYzNTM3LCJleHAiOjE2NjQzNDk5Mzd9.W3fpa7T4iNLAKahdNQ6VWc1-Uqt8UcRp9dGGg17Yims

sample request body : 
{
    "productIds" : [3,4]
}
sample response body : 
{
    "id": 1,
    "selectedProducts": [
        {
            "id": 3,
            "name": "Iphone xr",
            "cost": 49000
        },
        {
            "id": 4,
            "name": "Iphone xr",
            "cost": 49000
        }
    ],
    "cost": 98000
}
```

---


## 17. Get a Cart
```sh
GET /ecomm/api/v1/carts/:id


Headers : 
 Content-Type : application/json
 x-access-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY0MjYzNTM3LCJleHAiOjE2NjQzNDk5Mzd9.W3fpa7T4iNLAKahdNQ6VWc1-Uqt8UcRp9dGGg17Yims

Parameters : id : 1
sample request body : {}
sample response body : 
{
    "id": 1,
    "selectedProducts": [
        {
            "id": 3,
            "name": "Iphone xr",
            "cost": 49000
        },
        {
            "id": 4,
            "name": "Iphone xr",
            "cost": 49000
        }
    ],
    "cost": 98000
}
```

---

## **PostMan** 
- Collection [link](https://www.getpostman.com/collections/e6672cf8e91fa1223a56)