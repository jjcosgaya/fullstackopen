const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const api = supertest(app);

const initialUsers = [
  {
    name: 'Antonio',
    username: 'antoñito123',
    password: 'qwerty',
  },
  {
    name: 'Pepito',
    username: 'xxPepitoxx',
    password: 'aabbcc',
  }
];

const saltRounds = 10;

beforeEach(async () => {
  initialUsers[0].hash = await bcrypt.hash(initialUsers[0].password, saltRounds);
  initialUsers[1].hash = await bcrypt.hash(initialUsers[1].password, saltRounds);
  await User.deleteMany({});
  await User.insertMany(initialUsers);
});

after(async () => {
  await mongoose.connection.close();
});

test('Usernames are unique', async () => {
  const newUser = {
    name: 'Otro',
    username: initialUsers[0].username,
    password: 'pppppp',
  };
  const response = await api.post('/api/users')
    .send(newUser)
    .expect(400);

  const lengthAfterOperation = await User.countDocuments({});

  assert.strictEqual(lengthAfterOperation, initialUsers.length);
  assert.match(response.body.error, /username already in use/i);
});

test('If username is not provided, user is not created', async () => {
  const newUser = {
    name: 'Otro',
    password: 'pppppp',
  };
  const response = await api.post('/api/users')
    .send(newUser)
    .expect(400);

  const lengthAfterOperation = await User.countDocuments({});

  assert.strictEqual(lengthAfterOperation, initialUsers.length);
  assert.match(response.body.error, /username is required/i);
});

test('If password is not provided, user is not created', async () => {
  const newUser = {
    name: 'Otro',
    username: 'ajopqjr',
  };
  const response = await api.post('/api/users')
    .send(newUser)
    .expect(400);

  const lengthAfterOperation = await User.countDocuments({});

  assert.strictEqual(lengthAfterOperation, initialUsers.length);
  assert.match(response.body.error, /password is required/i);
});

test('If password is less than 3 characters long, user is not created', async () => {
  const newUser = {
    name: 'Otro',
    username: 'ajopqjr',
    password: 'ab'
  };
  const response = await api.post('/api/users')
    .send(newUser)
    .expect(400);

  const lengthAfterOperation = await User.countDocuments({});

  assert.strictEqual(lengthAfterOperation, initialUsers.length);
  assert.match(response.body.error, /password must be/i);
});
