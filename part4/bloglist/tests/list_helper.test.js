const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

const emptyList = [];
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
];
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];
const malformedBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    likes: 2,
  }
];
const missingLikesBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
];

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe('totalLikes function', () => {

  test('when the blogs array is empty, the total amount of likes is 0', () => {
    const result = listHelper.totalLikes(emptyList);
    assert.strictEqual(result, 0);
  });
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
  test('when a list has more than one blog, equals the sum of likes', () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36);
  });
  test('when a list has malformed blogs', () => {
    const result = listHelper.totalLikes(malformedBlogs);
    assert.strictEqual(result, 36);
  });
  test('when a list has blogs without the likes property', () => {
    const result = listHelper.totalLikes(missingLikesBlogs);
    assert.strictEqual(result, 19);
  });
});

describe('favoriteBlog function', () => {
  test('empty blog list', () => {
    const result = listHelper.favoriteBlog(emptyList);
    assert.deepStrictEqual(result, {});
  });
  test('only one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });
  test('list with several blogs', () => {
    const result = listHelper.favoriteBlog(blogs);
    const favorite = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    };
    assert.deepStrictEqual(result, favorite);
  });
  test('list with malformed blogs', () => {
    const result = listHelper.favoriteBlog(malformedBlogs);
    const favorite = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
      __v: 0
    };
    assert.deepStrictEqual(result, favorite);
  });
  test('list with blogs missing likes', () => {
    const result = listHelper.favoriteBlog(missingLikesBlogs);
    const favorite = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    } ;
    assert.deepStrictEqual(result, favorite);
  });
});


describe('mostBlogs function', () => {
  test('empty blog list', () => {
    const result = listHelper.mostBlogs(emptyList);
    assert.deepStrictEqual(result, {});
  });
  test('only one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    const most = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    };
    assert.deepStrictEqual(result, most);
  });
  test('list with several blogs', () => {
    const result = listHelper.mostBlogs(blogs);
    const most = {
      author: 'Robert C. Martin',
      blogs: 3
    };
    assert.deepStrictEqual(result, most);
  });
  test('list with malformed blogs', () => {
    const result = listHelper.mostBlogs(malformedBlogs);
    const most = {
      author: 'Edsger W. Dijkstra',
      blogs: 2
    };
    assert.deepStrictEqual(result, most);
  });
  test('list with blogs missing likes', () => {
    const result = listHelper.mostBlogs(missingLikesBlogs);
    const most = {
      author: 'Edsger W. Dijkstra',
      blogs: 2
    };
    assert.deepStrictEqual(result, most);
  });
});
