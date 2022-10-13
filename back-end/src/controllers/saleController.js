const saleService = require('../services/saleService');
const salesProductsService = require('../services/salesProductsService');

const SaleController = {
  createSale: async (req, res) => {
    const { shoppingCart, ...data } = req.body;
    const sale = await saleService.createSale(data);
    Promise.all(shoppingCart.map((cartItem) => salesProductsService
      .createSalesProducts({ 
        saleId: sale.id,
        productId: cartItem.id,
        quantity: Number(cartItem.quantity),
      })));
    res.status(201).json(sale.id);
  },

  listSales: async (_req, res) => {
    const sales = await saleService.listSales();
    res.status(200).json(sales);
  },

  listCompleteSale: async (_req, res) => {
    const sales = await saleService.listCompleteSale();
    res.status(200).json(sales);
  },

  updateSale: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    await saleService.updateSale(id, data);
    res.status(200).json({ message: 'Sale updated' });
  },
};

module.exports = SaleController;