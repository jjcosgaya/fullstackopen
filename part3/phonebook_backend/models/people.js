const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },

  number: {
    type: String,
    minLength: 3,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: () => 'Invalid phone number'
    },
    required: [true, 'Number is required']
  }
});

personSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = String(returnedObject._id);
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);