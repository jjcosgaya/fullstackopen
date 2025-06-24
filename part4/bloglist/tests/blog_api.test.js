const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert')
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const mongoose = require('mongoose');

const api = supertest(app);

const initialBlogs = [{
  title: 'Primero',
  author: 'Miguel',
  url: 'https://miguel.com',
  likes: 40
},
{
  title: 'Primero',
  author: 'Miguel',
  url: 'https://miguel.com',
  likes: 40
}];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

after(async () => {
  await mongoose.connection.close();
});

test('correct amount of json blog posts is returned', async () => {
  const response = await api.get('/api/blogs')
    .expect('Content-Type', /application\/json/);

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test('id name is id (not _id)', async () => {
  const response = await api.get('/api/blogs');
  const idBool = Object.keys(response.body[0]).includes('id');
  const otherIdBool = Object.keys(response.body[0]).includes('_id');
  assert(idBool && !otherIdBool);
});

test('post request adds a blog', async () => {
  const blog = { title: 'a', author: 'b', url: 'c', likes: 1 };
  await api.post('/api/blogs')
    .send(blog);
  const blogs = await Blog.find({});
  const resultingBlog = blogs[blogs.length-1];
  assert.strictEqual(blog.title, resultingBlog.title);
  assert.strictEqual(blog.author, resultingBlog.author);
  assert.strictEqual(blog.url, resultingBlog.url);
  assert.strictEqual(blog.likes, resultingBlog.likes);
  assert.strictEqual(blogs.length, initialBlogs.length + 1);
});

test('missing likes defaults to 0', async () => {
  const blog = { title: 'a', author: 'b', url: 'c' };
  await api.post('/api/blogs').send(blog);
  const blogs = await Blog.find({});
  const resultingBlog = blogs[blogs.length-1];
  assert.strictEqual(resultingBlog.likes, 0);
});

test('missing title or url returns status 400', async () => {
  const missingTitle = { author: 'b', url: 'c', likes: 4 };
  const missingUrl = { title: 'a', author: 'b', likes: 4 };
  await api.post('/api/blogs')
    .send(missingTitle)
    .expect(400);
  await api.post('/api/blogs')
    .send(missingUrl)
    .expect(400);
});

test('delete request deletes blog and returns 204', async () => {
  const blogs = await Blog.find({});
  const id = blogs[0].id;
  await api.delete(`/api/blogs/${id}`).expect(204);
  const newBlogs = await Blog.find({});
  assert.strictEqual(newBlogs.length, initialBlogs.length-1);
});

test('put request updates post', async () => {
  const newBlog = { title: 'a', author: 'b', url: 'c', likes: 349};
  const blogs = await Blog.find({});
  const id = blogs[0].id;
  const result = await api.put(`/api/blogs/${id}`)
    .send(newBlog);
  assert.strictEqual(newBlog.title, result.body.title);
  assert.strictEqual(newBlog.author, result.body.author);
  assert.strictEqual(newBlog.url, result.body.url);
  assert.strictEqual(newBlog.likes, result.body.likes);
})
