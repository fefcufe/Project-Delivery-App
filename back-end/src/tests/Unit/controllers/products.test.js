const ProductService = require('../../../services/productService');
const ProductController = require('../../../controllers/productController');
const { expect } = require('chai')
const sinon = require('sinon');

describe('return list of data in database', () => {
  const res = {};
  const req = {};
  const resolve = [
    {
      "id": 1,
      "name": "Skol Lata 250ml",
      "price": "2.20",
      "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg"
    },
  ]

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.stub(ProductService, 'listProducts').resolves(resolve);
  });
  
  afterEach(() => {
    sinon.restore();
  });
  
  it('return "status" with code 200', async () => {
    await ProductController.listProducts(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  });
  it('return "json" with all data', async () => {
    await ProductController.listProducts(req, res);
    expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
  })
})
