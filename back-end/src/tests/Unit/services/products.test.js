const sinon = require('sinon');
const { expect } = require('chai');
const Model = require('../../../database/models');
const productsService = require('../../../services/productService');

describe('ao ser chamada retorna um array', () => {
  describe('retorna array vazio caso não tenham dados no banco de dados', () => {
    const result = [{ id: 1, name: 'Skol Lata 250ml', price:'2.20', imageUrl: 'url da image' }];

    beforeEach(() => {
      sinon.stub(Model.Product, 'findAll').resolves(result);
    });

    afterEach(() => {
      sinon.restore();
    })

    it('return an array', async () => {
      const result = await productsService.listProducts();
      expect(result).to.be.an('array');
    })

    describe('The object has all properties', () => {
      it('the object in array has the following keys: id, name, price, imageUrl', async () => {
        const [result] = await productsService.listProducts();
        expect(result).to.includes.all.keys('id', 'name', 'price', 'imageUrl');
      })
    })
  });
})