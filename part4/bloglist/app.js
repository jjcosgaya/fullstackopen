const express = require('express');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const errorHandler = require('./utils/error_handler');
const middleware = require('./utils/middleware');

const { mongoUrl } = require('./utils/config');
mongoose.connect(mongoUrl).then(() => console.log('Connected to mongodb'));

const app = express();

app.use(express.json());
app.use(middleware.tokenExtractor);
app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(errorHandler);


module.exports = app;
