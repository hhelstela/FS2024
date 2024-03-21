import { useState } from 'react'
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  const [toShow, setToShow] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
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
    setToShow(persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()) === true))
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
      <div>
        filter shown with <input value={search} onChange={handleSearch}/>
      </div>
      <h2>
        add a new
      </h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {toShow.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
          )}
      </ul>
    </div>
  )

}

export default App