const sinon = require('sinon');
const { expect } = require('chai');
const Model = require('../../../database/models');
const SalesProductsService = require('../../../services/salesProductsService');

describe('Ensure salesProducts services is ok', () => {
  describe('return empty array when have no data in database', () => {
    const result = [{ id: '1', userId: '2', sellerId: '3', totalPrice: '4', deliveryAddress: 'rua', deliveryNumber:'5', saleDate:'11/11/1994', status:'pendind' }];

    beforeEach(() => {
      sinon.stub(Model.SalesProducts, 'create').resolves(result);
    });

    afterEach(() => {
      sinon.restore();
    })

    it('return an array of object', async () => {
      const result = await SalesProductsService.createSalesProducts();
      expect(result).to.be.an('array');
    })
  })  
})