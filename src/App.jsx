import { useState, useEffect } from 'react'
import Person from "./components/Person"
import Search from "./components/Search"
import AddPerson from './components/AddPerson'
import Notification from './components/Notification'
import axios from 'axios'
import peopleService from "./services/persons"
import Error from "./components/Error"


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setNewSearch] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('effect')
    peopleService.getAll().then((people) => {
      setPersons(people)
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [])

  const addName = (event) => {
    event.preventDefault()
    console.log(newName)

    const personObj = {
      name: newName,
      number: newNumber,
    }
    
    const exists = persons.some(person => person.name === newName)
    const num = persons.some(person => person.number === newNumber)
    const msg = `${newName} already has a saved number. Would you like to update it?`

    if (exists && num) {
      window.alert(`${newName} / ${newNumber} is already added to the phonebook`);
    }
    if (exists && !num) {
      if (window.confirm(msg) === true) {
        const personId = persons.filter(person => person.name === newName)
        console.log(`person ID ${personId[0].id}`)

        peopleService.update(personId[0].id, personObj)
          .then((returnedPerson) => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
            setNewName("")
            setNewNumber("")
            setMessage(`${newName} has been added to the phonebook`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        })
        .catch(error => {
          setError(error.response.data.error);
        })
      }
    }
    
    if (!exists) {
      peopleService.create(personObj).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName("")
      setNewNumber("")
      setMessage(`${newName} has been added to the phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
    })
    .catch(error => {
      console.log('Error caught:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An unknown error occurred');
      }
    })
  }
}

const deletePerson = (id) => {
    console.log(`Deleting user ID: ${id}`)

    peopleService.del(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => {
      const bigP = persons.filter(person => person.id === id)
      setError(`Information for ${bigP[0].name} has already been removed`)
      setTimeout(() => {
        setError(null)
      }, 5000)
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const handlerNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlerNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlerSearch = (event) => {
    setNewSearch(event.target.value)
    setShowAll(false)
  }

  const peopleToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(newSearch))
  return (
    <div>
      <h1>Phonebook</h1>
        <Error error={error} />
        <Notification message={message} />
        <Search value={newSearch} onChange={handlerSearch}/>
      <form onSubmit={addName}>
        <AddPerson nameVal={newName} numVal={newNumber} chgNum={handlerNumberChange} chgName={handlerNameChange} />
        <div><button type="submit">add</button></div>
      </form>
      <h1>Numbers</h1>
        <div>
          {peopleToShow.map((person) => (
            <Person key={person.id} person={person} onDelete={deletePerson}/>
          ))}
        </div>
    </div>
  )
}

export default App