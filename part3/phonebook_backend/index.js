const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/people');

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

morgan.token('body', function (req) { return JSON.stringify(req.body); });
const morganFormatString = ':method :url :status :res[content-length] - :response-time ms :body';

app.use(morgan(morganFormatString));


app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => res.json(persons));
});
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) res.json(person);
      else res.status(404);
    })
    .catch(error => next(error));
});
app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(person => {
      if (person) return res.status(200).json(person);
      res.status(404).end();
    });
});
app.post('/api/persons', (req, res, next) => {
  const person = new Person(req.body);
  // if (persons.some(person => person.name === req.body.name)) return res.json({error: 'name must be unique'});

  person.save()
    .then(person => res.json(person))
    .catch(e => next(e));
});
app.put('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      person.number = req.body.number;
      person.save()
        .then(person => res.json(person))
        .catch(e => next(e));
    });
});

app.get('/info', (req, res) => {
  Person.countDocuments()
    .then(n => {
      res.send(`<p>The phonebook has info for ${n} people</p>
        ${new Date()}`);
    });
});

const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Malformed id' });
  }
  else next(error);
};
app.use(errorHandler);

app.listen(3001);