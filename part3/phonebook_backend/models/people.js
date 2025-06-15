const mongoose = require('mongoose');
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
personSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = String(returnedObject._id);
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)