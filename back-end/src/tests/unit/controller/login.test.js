const { expect } = require('chai');
const sinon = require ('sinon');
// import { describe } from 'pm2';
// import { NextFunction, Request, Response } from 'express';
// import { describe } from 'pm2';
const { token, loginUser, loggedUserResponse } = require('../../mocks/loginMocks');
const LoginController = require('../../../controllers/loginController');
const LoginService = require('../../../services/loginService');
const models = require ('../../../database/models');

describe('Login Controller', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
    });

    after(() => {
        sinon.restore()
    })

    describe('Login é realizado com sucesso', () => {
        it('retorna objeto com dados do usuario e status 200 em caso de sucesso', async () => {
          sinon.stub(models.User, "findOne").resolves(loggedUserResponse);
          sinon.stub(LoginService, 'createToken').resolves(token)
          req.body = loginUser

          await LoginController.readUser(req,res);

          expect(res.status.calledWith(200)).to.be.true
          expect((res.json).calledWith(loggedUserResponse)).to.be.true;
        })
    })
})
