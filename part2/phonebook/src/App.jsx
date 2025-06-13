import { useState, useEffect } from 'react'
import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  
  useEffect(() => {
    personService.getAll()
      .then(data => setPersons(data))
  }, [])
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setQuery={setQuery} query={query}/>
      <h2>Add a new</h2>
      <PersonForm persons={persons} newName={newName} newNumber={newNumber} setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} query={query} setPersons={setPersons}/>
    </div>
  )
}

const Filter = ({setQuery, query}) => {
  const handleSearch = e => {
    setQuery(e.target.value);
  }
  return(
    <>filter shown with <input placeholder="Search..." onChange={handleSearch} value={query}></input></>
  )
}

const PersonForm = ({ persons, setPersons, setNewName, setNewNumber, newName, newNumber}) => {
  const validatePerson = (name) => !persons.some(person => person.name === name);
  const handleSubmit = e => {
    e.preventDefault();
    if (validatePerson(newName)) {
      const newPerson = {name: newName, number: newNumber}
      personService.addPerson(newPerson)
        .then(res => {
          const newPersons = persons.concat(res);
          setPersons(newPersons);
          setNewName("")
          setNewNumber("")
        })
      .catch(() => alert('Error'))
    }
    else {
      const confirmed = window.confirm(`${newName} is already added to the phonebook, do you wish to replace the old phone number with the new one?`);
      if (confirmed) {
        const person = persons.find(person => person.name === newName)
        const newPerson = {...person, number: newNumber}
        personService.updatePerson(newPerson)        
          .then(data => {
            setPersons(persons.map(person => person.name === newName ? data : person))
            setNewName("")
            setNewNumber("")
          })
      }
    }
  }
  const handleNameChange = e => {
    //The target is the input element
    setNewName(e.target.value)
  }
  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  return(
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleNameChange} value={newName}/>
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, query, setPersons}) => {
  const deletePerson = person => {
    if ( window.confirm(`Are you sure you want to delete ${person.name}?`) ) {
      personService.deletePerson(person)
        .then(res => {
          const newPersons = persons.filter(person => person.id !== res.id) ;
          setPersons(newPersons);
        })
    }
  }

  return(
    <ul style={{paddingLeft: 0}}>
      {persons
        .filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
        .map(person => <li type="none" key={person.name}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person)}>delete</button>
          </li>)}
    </ul>
  )
}

export default App