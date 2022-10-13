const { Router } = require('express');
const userController = require('../controllers/userController');
const jwtValidation = require('../middlewares/jwtValidation');

const route = Router();

route.delete('/users/:id', jwtValidation, userController.deleteUser);
route.post('/users', jwtValidation, userController.createUser);
route.get('/users', userController.listUsers);

module.exports = route;