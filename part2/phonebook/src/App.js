import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(persons =>
        setPersons(persons)
      )
  },[])

  const addNewName = (event) => {
    event.preventDefault()
    const foundPerson = persons.find(person => person.name === newName)
    if(!foundPerson){
      const personObject = { name: newName, number: newNumber}

      personService
        .create(personObject)
        .then(returnedPerson =>{
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          }
        )
    }
    else{
      if (window.confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)) { 
        const updatedPerson = {
          ...foundPerson,
          number: newNumber
        }

        personService
          .update(foundPerson.id,updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedPerson))
          })
      }
    }
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

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) { 
      personService
      .deletePerson(id)
      .then(
        setPersons(
          persons.filter(person => person.id !== id)
        )
      )
    }
  }

  const formValues = { 
    addNewName,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange
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
        <Persons personsToShow={personsToShow} deleteHandler={handleDelete} />
    </div>
  )
}

export default App
