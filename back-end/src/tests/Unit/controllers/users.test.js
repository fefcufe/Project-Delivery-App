const { expect } = require("chai");
const UserController = require("../../../controllers/userController");
const sinon = require('sinon');
const UserService = require("../../../services/userService");

describe('test if return a list with all users', () => {
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
    await UserController.listUsers(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  });
});

describe('test if create a user', () => {
  const mock = { id: '1', name: 'Enzo da Silva', email: 'enzao@email.com', password: 'algumasenha', role: 'Customer'};
  const res = {};
  const req = {};
  const correctBody = { 
    name: "Valentina da Silva",
    email: "valentina@email.com",
    password: "algumasenha",
    role: "Customer"
  };
  const wrongBody = { 
    name: "Enzo da Silva",
    email: "enzao@email.com",
    password: "algumasenha",
    role: "Customer"
  }

  before(() => {
    sinon.stub(UserService, 'createUser').resolves(mock);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('its called "status" with code 201', async () => {
    req.body = correctBody;
    await UserController.createUser(req, res);
    expect(res.status.calledWith(201)).to.be.equal(true);
  });

  it('its called "status" with code 409', async () => {
    req.body = wrongBody;
    await UserController.createUser(req, res);
    expect(res.status.calledWith(409)).to.be.equal(true);
  });
});

describe('test if delete a user', () => {
  const res = {};
  const req = {
    params: {
      id: 1,
    },
    body: { 
      name: "Valentina da Silva",
      email: "valentina@email.com",
      password: "algumasenha",
      role: "Customer"
    }
  };

  before(() => {
    sinon.stub(UserService, 'deleteUser').resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('its called "status" with code 201', async () => {
    await UserController.deleteUser(req, res);
    expect(res.status.calledWith(201)).to.be.equal(true);
  });
});