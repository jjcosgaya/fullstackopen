const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((acc, blog) => acc + (blog.likes ?? 0) , 0);
};

const favoriteBlog = blogs => {
  let result = blogs.reduce((favorite, blog) => blog.likes > favorite.likes ? blog : favorite , { likes: -1 });
  if (result.likes === -1) result = {};
  return result;
};

const mostBlogs = blogs => {
  const authors = blogs.reduce((authors, blog) => {
    if (blog.author) {
      if (authors[blog.author]) authors[blog.author].blogs++;
      else {
        authors[blog.author] = {};
        authors[blog.author].blogs = 1;
      }
    }
    return authors;
  }, {});

  let result = { blogs: -1 };
  for (let author of Object.keys(authors)) {
    if (authors[author].blogs > result.blogs) result = { author, blogs: authors[author].blogs };
  };
  if (result.blogs === -1) result = {};
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
