const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const Person = require("./models/people")

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
const morganFormatString = ':method :url :status :res[content-length] - :response-time ms :body'

app.use(morgan(morganFormatString))


app.get("/api/persons", (req, res) => {
  Person.find({})
    .then(persons => res.json(persons))
})
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) res.json(person);
      else res.status(404);
    })
    .catch(error => next(error))
})
app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(person => {
      if (person) return res.status(204).json(person);
      res.status(204).end()
    })
})
app.post("/api/persons", (req, res, next) => {
  const person = new Person(req.body)
  if (!req.body.name) {
    const e = new Error('name is required');
    e.name = "ValidationError";
    return next(e);
  }
  if (!req.body.number) {
    const e = new Error('number is required');
    e.name = "ValidationError";
    return next(e);
  }
 // if (persons.some(person => person.name === req.body.name)) return res.json({error: 'name must be unique'});
  
  person.save()
    .then(person => res.json(person))
})
app.put("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      person.number = req.body.number;
      person.save()
        .then(person => res.json(person))
    })
})

app.get("/info", (req, res) => {
  Person.countDocuments()
    .then(n => {
      res.send(`<p>The phonebook has info for ${n} people</p>
        ${new Date()}`);
    })
})

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.json({error: error.message})
  }
  if (error.name === "CastError") {
    return res.json({error: "Malformed id"})
  }
  else next(error);
}
app.use(errorHandler)

app.listen(3001)