const saleController = require('../../../controllers/saleController');
const { expect } = require('chai')
const sinon = require('sinon');

describe('test if create a sale', () => {
  const res = {};
  const req = {
    body: {
      shoppingCart: [{ id: 4, quantity: "14" }, { id: 3, quantity: "12" }],
      userId: 3,
      sellerId: 2,
      totalPrice: 20.10,
      deliveryAddress: "Rua trinta e dois",
      deliveryNumber: "192",
      status: "Pendente"
    }
  };
  
  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });
  
  afterEach(() => {
    sinon.restore();
  });
  
  it('its called "status" with code 200', async () => {
    await saleController.createSale(req, res);
    expect(res.status.calledWith(201)).to.be.equal(true);
  });
})

describe('test if return a list with all sales', () => {
  const res = {};
  const req = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('its called "status" with code 200', async () => {

    await saleController.listSales(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  });
})

describe('test if return a list with all complete sales', () => {
  const res = {};
  const req = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('its called "status" with code 200', async () => {

    await saleController.listCompleteSale(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  });
})

describe('test if sale is updated', () => {
  const res = {};
  const req = { params: { id: '1' }, body: { status: 'in transit' } };

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('its called "status" with code 200', async () => {

    await saleController.updateSale(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  });
})
