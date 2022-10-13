const jwt = require('jsonwebtoken');
const fs = require('fs');

const models = require('../database/models');

const secretKey = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token does not exist' });

  try {
    const decoded = jwt.verify(token, secretKey);
    const user = await models.User.findOne({
      where: { email: decoded.email },
    });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};