const jwt = require('jsonwebtoken');
const fs = require('fs');
const md5 = require('md5');
const { Op } = require('sequelize');
const models = require('../database/models');

const LoginService = {
  readUser: async (data) => {
    const { email, password } = data;
    const md5Password = md5(password);
    const user = await models.User.findOne({
      where: { email },
    });

    if (!user || user.password !== md5Password) return null;

    return user;
  },

  createUser: async (data) => {
    const { email, name } = data;
    const isUser = await models.User.findOne({
      where: { [Op.or]: [{ email }, { name }] },
    });
    
    if (isUser) return null;
    
    const md5Password = md5(data.password);
    const newUser = { ...data, password: md5Password, role: 'customer' };
    const user = await models.User.create(newUser);

    return user;
  },

  createToken: async (data) => {
    const { name, email, role } = data;
    const payload = { name, email, role };
    const secretKey = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
    const token = jwt.sign(payload, secretKey);
    return token;
  },
};

module.exports = LoginService;