const Express = require('express');
const Router = Express.Router();
const EmployeeController = require('../controllers/Employee'); 
const jwtmiddleware = require('../middleware/jwt')
Router.post('/Register',EmployeeController.EmployeeRegistration)
Router.post('/LogIn',EmployeeController.Login)
// Router.get('/LogInData',jwtmiddleware,EmployeeController.UserDeails)
Router.get('/LogInData',EmployeeController.UserDeails)
Router.put('/RegisterUpdate/:id',EmployeeController.EmpyeeDetailsUpdate)
Router.delete('/RegisterDelete/:id',EmployeeController.EmployeeDetailsDelete)

module.exports = Router;

// const EmployeeController = require('../controllers/Employee');

// Router.post('/Register',EmployeeController.EmployeeRegistration)
// Router.post('/LogIn',EmployeeController.Login)
// Router.put('/RegisterUpdate/:id',EmployeeController.EmpyeeDetailsUpdate)
// Router.delete('/RegisterDelete/:id',EmployeeController.EmployeeDetailsDelete)