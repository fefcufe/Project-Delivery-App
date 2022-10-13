const sinon = require('sinon');
const { expect } = require('chai');
const Model = require('../../../database/models');
const UserService = require('../../../services/userService');

describe('Ensure users services is ok', () => {
  describe('return empty array when have no data in database', () => {
    const result = [{ id: '1', name: 'Jose Maria', email: 'maria@jose.com', password: 'senhaqualquer', role: 'Customer'}];

    beforeEach(() => {
      sinon.stub(Model.User, 'findAll').resolves(result);
    });

    afterEach(() => {
      sinon.restore();
    })

    it('return an array of object', async () => {
      const result = await UserService.listUsers();
      expect(result).to.be.an('array');
    })

    describe('The object has properties', () => {
      it('the object in array has the following keys: id, name, email, password, role', async () => {
        const [result] = await UserService.listUsers();
        expect(result).to.be.an.keys('id', 'name', 'email', 'password', 'role');
      })
    })

    describe('ensure create a new user', () => {
      const mock = { id: '1', name: 'Enzo da Silva', email: 'enzao@email.com', password: 'algumasenha', role: 'Customer'};
      const data = { 
        name: "Enzo da Silva",
        email: "enzao@email.com",
        password: "algumasenha",
        role: "Customer"
      }

      beforeEach(() => {
        sinon.stub(Model.User, 'findOne').resolves(null);
        sinon.stub(Model.User, 'create').resolves(mock);
      });

      afterEach(() => {
        sinon.restore();
      })

      it('return an array of object', async () => {
        const result = await UserService.createUser(data);
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
        const result = await UserService.createUser(data);
        expect(result).to.be.equal(null);
      })
    });

    describe('ensure delete a user', () => {
      beforeEach(() => {
        sinon.stub(Model.User, 'destroy').resolves();
      });
  
      afterEach(() => {
        sinon.restore();
      })
  
      it('return an array of object', async () => {
        const result = await UserService.deleteUser('1');
        expect(result).to.be.equal(undefined);
      })
    });
  })
})