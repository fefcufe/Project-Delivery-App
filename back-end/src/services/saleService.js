const models = require('../database/models');

const SaleService = {
  createSale: async (data) => {
    const sale = await models.Sale.create(data);

    return sale;
  },

  listSales: async () => {
    const sales = await models.Sale.findAll();

    return sales;
  },

  listCompleteSale: async () => {
    const sales = await models.Sale.findAll({
      include: [{ 
        model: models.User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }, {
        model: models.User,
        as: 'seller',
        attributes: { exclude: ['password'] },
      }, {
        model: models.Product,
        as: 'products',
      }],
    });

    return sales;
  },

  updateSale: async (id, data) => {
    const { status } = data;
    const [updatedSale] = await models.Sale.update(
      { status },
      { where: { id } },
    );
    return updatedSale;
  },
};

module.exports = SaleService;