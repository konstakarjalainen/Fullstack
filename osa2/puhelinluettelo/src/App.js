import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [isError, setError] = useState(false)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log("Button", event.target, newName)
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const samePerson = persons.find(person => person.name === newName)
    console.log("Finding same person", samePerson)
    if (samePerson) {
      const changedPerson = {...samePerson, number: newNumber}
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            setNotification(`Changed the number of ${newName} to ${newNumber}`)
            setTimeout(() => {
              setNotification(null)
            }, 3000)
          })
          
          .catch(error => {
            setError(true)
            setNotification(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setNotification(null)
              setError(false)
            }, 3000)
          })
      }
    }else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          
        })
      setNotification(`Added ${newName}`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    console.log('id:', id)
    const person = persons.find(p => p.id === id)
    console.log('Person to delete', person)
    if (window.confirm(`Delete ${person.name}?`)) {
        personService
        .remove(person.id)
        .then(response => {
          console.log('Person deleted', response)
          setNotification(`Deleted ${person.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(error => {
          setError(true)
          setNotification(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setNotification(null)
            setError(false)
          }, 3000)
        })
      setPersons(persons.filter(deletedPerson => deletedPerson.id !== id))
    }
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} isError={isError}/>
      <div>
        <Filter value={newFilter} onChange={handleFilterChange}/>
      </div>
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        name={newName} nameOnChange={handleNameChange}
        number={newNumber} numOnChange={handleNumChange}
        type="submit"
      />
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map(person =>
        <Person key={person.id} name={person.name} 
        number={person.number} deletePerson={() => deletePerson(person.id)}/>
        )}
      </div>
    </div>
  )

}

export default App