const { expect } = require("chai");
const sinon = require("sinon");
const LoginController = require("../../../controllers/loginController");
const LoginService = require("../../../services/loginService");

describe('test if readUser return user', () => {
  const req = {};
  const res = {};

  const mock = {
    id: '1',
    name: 'Jose Maria',
    email: 'enzao@email.com',
    role: 'Customer',
  }

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('its called called "status" with code 200', async () => {
    sinon.stub(LoginService, 'readUser').resolves(mock)

    req.body = {
      email: 'enzao@email.com',
      password: 'algumasenha',
    }
  
    await LoginController.readUser(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  });
  
  it('its called with "status" with code 404', async () => {
    sinon.stub(LoginService, 'readUser').resolves(null);

    req.body = {}
  
    await LoginController.readUser(req, res);
    expect(res.status.calledWith(404)).to.be.equal(true);
  });
});

describe('test if create an user', () => {
  const req = {};
  const res = {};

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('its called "status" with code 200', async () => {
    sinon.stub(LoginService, 'createUser').resolves(true);

    req.body = {
      email: 'enzao@email.com',
      password: 'algumasenha',
    }

    await LoginController.createUser(req, res);
    expect(res.status.calledWith(201)).to.be.equal(true);
  });
  
  it('its called "status" with code 200', async () => {
    sinon.stub(LoginService, 'createUser').resolves(false);

    req.body = {};

    await LoginController.createUser(req, res);
    expect(res.status.calledWith(409)).to.be.equal(true);
  });
});