const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { SECRET } = require('../utils/config');

const loginRouter = express.Router();

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    const error = new Error('Username not found');
    error.name = 'LoginError';
    next(error);
  }
  const passwordCorrect = await bcrypt.compare(password, user.hash);

  if (passwordCorrect) {
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET);
    res.status(200).json({ token, username: user.username, name: user.name });
  }
  else {
    const error = new Error('Incorrect password');
    error.name = 'LoginError';
    next(error);
  };
});

module.exports = loginRouter;
