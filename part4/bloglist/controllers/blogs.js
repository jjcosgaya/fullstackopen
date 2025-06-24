const express = require('express');
const Blog = require('../models/blog');

const blogsRouter = express.Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const reqBlog = request.body;
  if (!reqBlog.likes) reqBlog.likes = 0;

  if (!reqBlog.title || !reqBlog.url) return response.status(400).end();
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id;
  let deletedBlog;
  try{
    deletedBlog = await Blog.findByIdAndDelete(id);
  }
  catch(e){
    if (e.name === 'CastError') return response.status(204).json({});
    else next(e);
  }
  response.status(204).json(deletedBlog);
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
    else next(e);
  }
});

module.exports = blogsRouter;
