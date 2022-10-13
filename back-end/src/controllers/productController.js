const productService = require('../services/productService');

const ProductController = {
  listProducts: async (_req, res) => {
    const products = await productService.listProducts();
    res.status(200).json(products);
  },
};

module.exports = ProductController;