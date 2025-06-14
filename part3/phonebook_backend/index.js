const express = require("express")
const morgan = require("morgan")

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

app.use(express.json())

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
const morganFormatString = ':method :url :status :res[content-length] - :response-time ms :body'

app.use(morgan(morganFormatString))


app.get("/api/persons", (req, res) => res.json(persons))
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id === id);
  if (person) res.json(person);
  else res.status(404).json({error: "Not found"});
})
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id === id);
  persons = persons.filter(person => person.id !== id);
  res.json(person)
})
app.post("/api/persons", (req, res) => {
  const person = req.body;
  if (!req.body.name) return res.json({error: 'name is required'});
  if (!req.body.number) return res.json({error: 'number is required'});
  if (persons.some(person => person.name === req.body.name)) return res.json({error: 'name must be unique'});

  person.id = String(Math.floor(100000000 * Math.random()));
  persons.push(person);

  res.json(person);
})

app.get("/info", (req, res) => {
  res.send(`<p>The phonebook has info for ${persons.length} people</p>
    ${new Date()}`);
})

app.listen(3001)