const loginService = require('../services/loginService');

const LoginController = {
  readUser: async (req, res) => {
    const user = await loginService.readUser(req.body);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { id, name, email, role } = user;
    const token = await loginService.createToken(user);
    res.status(200).json({ id, name, email, role, token });
  },

  createUser: async (req, res) => {
    const user = await loginService.createUser(req.body);
    if (!user) return res.status(409).json({ message: 'User already exists' });
    res.status(201).json({ message: 'Created' });
  },
};

module.exports = LoginController;