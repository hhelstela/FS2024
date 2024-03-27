import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import  './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  const [toShow, setToShow] = useState(persons)
  const [changeMessage, setChangeMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
      setToShow(response.data)
    })
  }, [])

  const handleChangeMessage = (message) => {
    setChangeMessage(message)
    setTimeout(() => {
      setChangeMessage(null)
    }, 3000)
  }
  const handleErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    const newNames = persons.concat(person)
    const nameList = persons.map(person => person.name)
    if (!(nameList.includes(newName))) {
      personService
        .create(person)
        .then(response => {
          const concatPersons = persons.concat(response.data)
          setPersons(concatPersons)
          setToShow(concatPersons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) === true))
          handleChangeMessage('Added ' + person.name)
        })
    }
    else {
      if (window.confirm(person.name + " is already added to the phonebook, replace the old number with a new one?")) {
        const oldPerson = persons.filter(n => n.name === newName).at(0)
        const allPersons = persons.map(p => p.id !== oldPerson.id ? p: {...oldPerson, number: newNumber})
        personService.update(oldPerson.id, {...oldPerson, number: newNumber})
        .then(response => {
          setPersons(allPersons)
          setToShow(allPersons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) === true))
          handleChangeMessage("Changed the number of: " +  person.name)
        })
        .catch(error => {
          console.log("error")
          handleErrorMessage('Information of ' + person.name + ' has already been removed from the server')
          setPersons(persons.map(p => p.id !== oldPerson.id))
          setToShow(persons.map(p => p.id !== oldPerson.id).filter(p => p.name.toLowerCase().includes(search.toLowerCase()) === true))
        })
        
      }
    }
    setNewName('')
    setNewNumber('')
  }


  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
    
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
    const newSearch = event.target.value
    setToShow(persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()) === true))
  }

  const handleDelete = (person) => {
    console.log(person)
    if (window.confirm("Delete " + person.name)) {
      personService.remove(person.id)
      .then(response => {
        setPersons(persons.filter(n => n.id !== person.id))
        setToShow(toShow.filter(n => n.id !== person.id))
        handleChangeMessage('Deleted ' + person.name + ' from the phonebook')
      })
      .catch(error => {
        console.log("error")
        handleErrorMessage('Information of ' + person.name + ' has already been removed from the server')
        setPersons(persons.filter(n => n.id !== person.id))
        setToShow(toShow.filter(n => n.id !== person.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={changeMessage} type="change"/>
      <Notification message={errorMessage} type="error"/>
      <Filter value={search} onChange={handleSearch} />
      <h2>
        add a new
      </h2>
      <PersonForm addPerson={addPerson} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} />
      <h2>Numbers</h2>
      <Persons toShow={toShow} handleDelete={handleDelete}/>
      
    </div>
  )

}

export default App