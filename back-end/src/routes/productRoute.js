const { Router } = require('express');
const productController = require('../controllers/productController');

const route = Router();

route.get('/products', productController.listProducts);

module.exports = route;