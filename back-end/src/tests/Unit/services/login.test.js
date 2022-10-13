const sinon = require('sinon');
const { expect } = require('chai');
const Model = require('../../../database/models');
const UserService = require('../../../services/userService');
const LoginService = require('../../../services/loginService');

describe('Ensure login services is ok', () => {
  describe('return empty array when have no data in database', () => {
    const mock = {id: '1', name: 'Jose Maria', email: 'enzao@email.com', password: '87f4b05daddc33b9202e86d2cef6b1bb', role: 'Customer'};

    beforeEach(() => {
      sinon.stub(Model.User, 'findOne').resolves(mock);
    });

    afterEach(() => {
      sinon.restore();
    })

    it('return an array of object', async () => {
      const response = await LoginService.readUser({ email: 'enzao@email.com', password: 'algumasenha' });
      expect(response).to.be.an('object');
      expect(response).to.be.deep.equal(mock);
    })
  })

  describe('ensure create a new user', () => {
    const mock = {id: '1', name: 'Jose Maria', email: 'enzao@email.com', password: '87f4b05daddc33b9202e86d2cef6b1bb', role: 'Customer'};
    const data = { 
      name: "Enzo da Silva",
      email: "enzao@email.com",
      password: "algumasenha"
    }

    beforeEach(() => {
      sinon.stub(Model.User, 'findOne').resolves(false);
      sinon.stub(Model.User, 'create').resolves(mock);
    });

    afterEach(() => {
      sinon.restore();
    })

    it('return an array of object', async () => {
      const result = await LoginService.createUser(data);
      expect(result).to.be.equal(mock);
    })
  });

  describe('ensure return null in case exists user', () => {
    const data = { 
      name: "Enzo da Silva",
      email: "enzao@email.com",
      password: "algumasenha",
      role: "Customer"
    }
    beforeEach(() => {
      sinon.stub(Model.User, 'findOne').resolves({});
    });

    afterEach(() => {
      sinon.restore();
    })

    it('return an array of object', async () => {
      const result = await LoginService.readUser(data);
      expect(result).to.be.equal(null);
    })
  });

  describe('ensure return null in case exists user', () => {
    const data = { 
      name: "Enzo da Silva",
      email: "enzao@email.com",
      password: "algumasenha",
      role: "Customer"
    }
    beforeEach(() => {
      sinon.stub(Model.User, 'findOne').resolves({});
    });

    afterEach(() => {
      sinon.restore();
    })

    it('return an array of object', async () => {
      const result = await LoginService.createUser(data);
      expect(result).to.be.equal(null);
    })
  });

  describe('ensure create a token for user', () => {
    const payload = {
      email: "ravena@titans.com",
      password: "algumasenha"
    }

    afterEach(() => {
      sinon.restore();
    })

    it('return xablau', async () => {
      const result = await LoginService.createToken(payload);
      expect(result).to.be.an('string');
    })
  });
})