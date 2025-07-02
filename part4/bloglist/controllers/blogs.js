const express = require('express');
const Blog = require('../models/blog');

const blogsRouter = express.Router();

blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  if (request.user) {
    const user = request.user;
    const reqBlog = request.body;
    if (!reqBlog.likes) reqBlog.likes = 0;

    if (!reqBlog.title || !reqBlog.url) return response.status(400).end();

    reqBlog.user = user._id;

    const blog = new Blog(reqBlog);

    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response.status(201).json(result);
  }
  else {
    const error = new Error('Not authenticated');
    error.name = 'AuthorizationError';
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  if (!request.token) return response.status(403).json({ error: 'not authenticated' });
  let deletedBlog;
  try{
    if ( request.user._id.toString() === blog.user.toString() ) {
      deletedBlog = await Blog.findByIdAndDelete(id);
      return response.status(200).json(deletedBlog);
    }
    else {
      const error = new Error('Forbidden');
      error.name = 'AuthorizationError';
      return next(error);
    }
  }
  catch(e){
    if (e.name === 'CastError') return response.status(204).json({});
    else return next(e);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id;
  const newBlog = request.body;
  try{
    const blog = await Blog.findById(id);
    Object.assign(blog, newBlog);
    const result = await blog.save();
    return response.status(200).json(result);
  }
  catch(e){
    if (e.name === 'CastError') return response.status(404).json({});
    else return next(e);
  }
});

module.exports = blogsRouter;
