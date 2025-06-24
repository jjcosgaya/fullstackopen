const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id;
    delete returnedObject._id;
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
