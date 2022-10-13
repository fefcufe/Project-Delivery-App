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

const ProductModel = require ('../../../database/models/products');

describe('src/models/products', () => {
  const Product = ProductModel(sequelize, dataTypes)
  const product = new Product()
  
  checkModelName(Product)('Product')
  
  describe('properties', () => {
    ;['id', 'name', 'price', 'urlImage'].forEach(checkPropertyExists(product))
  })

  describe('Model Product associations', () => {
    const SalesProducts = 'some sales products';
    
    before(() => {
      Product.associate({ SalesProducts });
    });
    
    it('Products defines a hasMany association with SalesProducts', () => {
      expect(Product.hasMany).to.have.been.calledWith(SalesProducts);
    });
  }); 
})

