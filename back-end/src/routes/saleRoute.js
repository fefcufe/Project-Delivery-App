const { Router } = require('express');
const saleController = require('../controllers/saleController');

const jwtValitation = require('../middlewares/jwtValidation');

const route = Router();

route.post('/orders', jwtValitation, saleController.createSale);
route.put('/orders/:id', saleController.updateSale);
route.get('/orders', saleController.listSales);
route.get('/complete-orders', saleController.listCompleteSale);

module.exports = route;