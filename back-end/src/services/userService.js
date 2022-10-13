const md5 = require('md5');
const { Op } = require('sequelize');
const models = require('../database/models');

const UserService = {
  listUsers: async () => {
    const users = await models.User.findAll({
      attributes: { exclude: ['password'] },
    });

    return users;
  },

  createUser: async (data) => {
    const { email, name } = data;
    const isUser = await models.User.findOne({
      where: { [Op.or]: [{ email }, { name }] },
    });
    
    if (isUser) return null;
    
    const md5Password = md5(data.password);
    const newUser = { ...data, password: md5Password };
    const user = await models.User.create(newUser);

    return user;
  },

  deleteUser: async (id) => {
    await models.User.destroy({
      where: { id },
    });
  },
};

module.exports = UserService;