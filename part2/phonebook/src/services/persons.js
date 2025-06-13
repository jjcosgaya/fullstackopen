import axios, { getAdapter } from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(res => res.data)
const addPerson = person => axios.post(baseUrl, person).then(res => res.data)
const deletePerson = person => axios.delete(baseUrl + "/" + person.id).then(res => res.data)
const updatePerson = person => axios.put(baseUrl + "/" + person.id, person).then(res => res.data)

export default {
  getAll,
  addPerson,
  deletePerson,
  updatePerson
}