const models = require('../database/models');

const SalesProductsService = {
  createSalesProducts: async (data) => {
    const salesProducts = await models.SalesProducts.create(data);

    return salesProducts;
  },
};

module.exports = SalesProductsService;