import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response =>
        setPersons(response.data)
      )
  },[])

  const addNewName = (event) => {
    event.preventDefault()

    if(!persons.find(person => person.name === newName)){
      const personObject = { name: newName, number: newNumber}
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    else alert(`${newName} is already added to phonebook`)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const formValues = { 
    addNewName: addNewName,
    newName: newName,
    handleNameChange: handleNameChange,
    newNumber: newNumber,
    handleNumberChange: handleNumberChange
   }

  const personsToShow = filter === '' ? persons : persons.filter(person => 
                                                    person.name.toLowerCase().includes(
                                                      filter.toLowerCase()
                                                    ))

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
        <PersonForm formValues={formValues} />
      <h3>Numbers</h3>
        <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App