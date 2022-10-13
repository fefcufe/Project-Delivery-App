const models = require('../database/models');

const ProductService = {
  listProducts: async () => {
    const products = await models.Product.findAll();

    return products;
  },
};

module.exports = ProductService;