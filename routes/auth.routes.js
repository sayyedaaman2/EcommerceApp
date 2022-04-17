const controller = require('../controllers/auth.controller');
const { verifySignUp } = require('../middleware');

module.exports = function(app){

    // Post request for SignUp
    app.post('/ecomm/api/v1/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExists], controller.signup);

    // Post request for Login
    app.post('/ecomm/api/v1/auth/signin', controller.signin);

}