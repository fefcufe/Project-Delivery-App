const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

const SalesProductsModel = require ('../../../database/models/salesProducts');

describe('src/models/salesProducts', () => {
  const SalesProducts = SalesProductsModel(sequelize, dataTypes)
  const salesProducts = new SalesProducts()
  
  checkModelName(SalesProducts)('SalesProducts')
  
  context('properties', () => {
    ;['saleId', 'productId', 'quantity'].forEach(checkPropertyExists(salesProducts))
  })
})