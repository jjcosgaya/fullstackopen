const mongoose = require('mongoose')

const password = encodeURIComponent(process.argv[2]);
console.log(password)
const [name, number] = [process.argv[3], process.argv[4]];
const url = `mongodb+srv://fullstack:${password}@cluster0.y7mdi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url)
  .then(console.log("Connecting to mongoDB"))

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

// personSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

const Person = mongoose.model('Person', personSchema)

if (name) {
  const person = new Person({name, number})
  person.save()
    .then(person => {
      console.log(`added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    })
}
else {
  Person.find({})
    .then(res => {
      res.forEach(document => console.log(`${document.name} ${document.number}`))
      mongoose.connection.close()
    })
}
