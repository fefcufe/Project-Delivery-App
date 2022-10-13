const { Router } = require('express');
const loginController = require('../controllers/loginController');

const route = Router();

route.post('/login', loginController.readUser);
route.post('/register', loginController.createUser);

module.exports = route;