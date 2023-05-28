import { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log("Button", event.target, newName)
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const samePerson = persons.find(person => person.name === newName)
    if (samePerson) {
      alert(`${newName} is already added to phonebook.`)
    }else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(newFilter)
  })

  return (
    <div>
      <h2>Phonebook</h2>
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
      <div>{filteredPersons.map(person =>
        <Person key={person.name} name={person.name} number={person.number}/>
      )}
      </div>
    </div>
  )

}

export default App