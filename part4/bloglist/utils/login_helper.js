const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET } = require('./config');

const getToken = req => {
  const authorization = req.get('Authorization');
  if (authorization?.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  else return null;
};

const getUserFromToken = async token => {
  const decodedToken = jwt.verify(token, SECRET);
  const user = await User.findById(decodedToken.id);
  return user;
};

module.exports = { getToken, getUserFromToken };
