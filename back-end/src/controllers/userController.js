const userService = require('../services/userService');

const UserController = {
  listUsers: async (_req, res) => {
    const users = await userService.listUsers();
    res.status(200).json(users);
  },

  createUser: async (req, res) => {
    const user = await userService.createUser(req.body);
    if (!user) return res.status(409).json({ message: 'User already exists' });
    const users = await userService.listUsers();
    res.status(201).json(users);
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    await userService.deleteUser(id);
    const users = await userService.listUsers();
    res.status(201).json(users);
  },
};

module.exports = UserController;