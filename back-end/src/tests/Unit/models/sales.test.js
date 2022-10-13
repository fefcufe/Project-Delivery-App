const chai = require('chai');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

const SaleModel = require ('../../../database/models/sales');

describe('src/models/sales', () => {
  const Sale = SaleModel(sequelize, dataTypes)
  const sale = new Sale()
  
  checkModelName(Sale)('Sale')
  
  describe('properties', () => {
    ;['id', 'userId', 'sellerId', 'totalPrice', 'deliveryAddress', 'deliveryNumber', 'saleDate'].forEach(checkPropertyExists(sale))
  })

  describe('Model Sale associations', () => {
    const SalesProducts = 'some sales products';
    
    before(() => {
      Sale.associate({ SalesProducts });
    });
    
    it('Products defines a hasMany association with SalesProducts', () => {
      expect(Sale.hasMany).to.have.been.calledWith(SalesProducts);
    });
  });
  
  describe('Model Sale associations', () => {
    const User = 'some users';
    
    before(() => {
      Sale.associate({ User });
    });
    
    it('Sales defines a belongsTo association with User', () => {
      expect(Sale.belongsTo).to.have.been.calledWith(User);
    });
  });
})