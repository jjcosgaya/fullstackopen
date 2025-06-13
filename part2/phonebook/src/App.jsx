import { useState } from 'react'

const Filter = ({onChange, query}) => <>filter shown with <input placeholder="Search..." onChange={onChange} value={query}></input></>

const PersonForm = ({onSubmit, onNameChange, onNumberChange, name, number}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={onNameChange} value={name}/>
      </div>
      <div>
        number: <input onChange={onNumberChange} value={number}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = props => {
  return(
    <ul style={{paddingLeft: 0}}>
      {props.persons
        .filter(person => person.name.toLowerCase().includes(props.query.toLowerCase()))
        .map(person => <li type="none" key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  
  const handleNameChange = e => {
    //The target is the input element
    setNewName(e.target.value)
  }
  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    if (validatePerson(newName)) {
      const newPersons = persons.concat({name: newName, number: newNumber});
      setPersons(newPersons);
      setNewName("")
      setNewNumber("")
    }
    else alert(`${newName} is already added to the phonebook`);
  }
  
  const validatePerson = (name) => !persons.some(person => person.name === name);
  
  const handleSearch = e => {
    setQuery(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearch} query={query}/>
      <h2>Add a new</h2>
      <PersonForm onSubmit={handleSubmit} onNameChange={handleNameChange} onNumberChange={handleNumberChange} name={newName} number={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} query={query}/>
    </div>
  )
}

export default App