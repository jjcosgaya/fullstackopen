require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV;

const mongoUrl = NODE_ENV === 'production' ? process.env.MONGODB_URI : process.env.MONGODB_URI_TEST;
const PORT = 3003;

const SECRET = process.env.SECRET;

module.exports = { mongoUrl, PORT, SECRET };
