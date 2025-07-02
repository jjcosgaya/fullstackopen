const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const usersRouter = Router();

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body;

  if (!password) {
    const e = new Error('Password is required.');
    e.name = 'ValidationError';
    return next(e);
  }
  else if (password?.length < 3) {
    const e = new Error('Password must be at least 3 characters long.');
    e.name = 'ValidationError';
    return next(e);
  }

  try {
    const exists = await User.findOne({ username });
    if (exists) {
      const e = new Error('Username already in use, choose another one.');
      e.name = 'ValidationError';
      return next(e);
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ username, name, hash });
    const result = await newUser.save();

    res.status(201).json(result);
  }
  catch (e) {
    next(e);
  }
});

usersRouter.get('/', async (_, res, next) => {
  try{
    const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1, id: 1 });
    res.status(200).json(users);
  }
  catch (e) {
    next(e);
  }
});

module.exports = usersRouter;
