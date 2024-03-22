import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  const [toShow, setToShow] = useState(persons)

  const hook = () => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
      setToShow(response.data)
    })
  }

  useEffect(hook, [])
  console.log(persons)

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    const newNames = persons.concat(person)
    const nameList = persons.map(person => person.name)
    console.log(nameList)
    if (!(nameList.includes(newName))) {
      setPersons(persons.concat(person))
    }
    else {
      alert(newName + ' is already added to the phonebook')
    }
    setNewName('')
    setNewNumber('')
    setToShow(newNames.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) === true))
  }


  const handleName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
    
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
    const newSearch = event.target.value
    setToShow(persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()) === true))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleSearch} />
      <h2>
        add a new
      </h2>
      <PersonForm addPerson={addPerson} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} />
      <h2>Numbers</h2>
      <Persons toShow={toShow} />
      
    </div>
  )

}

export default App