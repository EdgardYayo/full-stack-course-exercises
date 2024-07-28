import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Person from './components/Person';
import Notification from './components/Notification';
import Error from './components/Error';
import { deletePerson, getAll, postNewPerson, updatePersonNumber } from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
      getAll()
        .then((personFetched) => setPersons(personFetched));
        // setMessage(newName + "'s number was changed succesfully");
        // setErrorMessage("Information of " + newName + " was already deleted");
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    let personAdded = persons.find((person) => person.name === newName);
    if(personAdded) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        updatePersonNumber({ ...personAdded, number: newNumber })
          .then((personEdited) => {
            setMessage(newName + "'s number was changed succesfully");
            setPersons(persons.map((person) => person.id !== personEdited.id ? person : personEdited));
            setNewName('');
            setNewNumber('');

            setTimeout(() => setMessage(null), 3000);
          }).catch((error) => {
            setErrorMessage("Information of " + newName + " was already deleted");
            setTimeout(() => setErrorMessage(null), 3000);
          })
          return;
      }
    }

    let newPerson = { name: newName, number: newNumber }

    postNewPerson(newPerson)
      .then((personPosted) => {
        setMessage(newName + " was added succesfully")
        setPersons(persons.concat(personPosted))
      });
    setNewName('');
    setNewNumber('');
    setTimeout(() => setMessage(null), 3000);
  }

  const handleDelete = (id) => {
    let personToDelete = persons.find((person) => person.id === id);
    if(window.confirm('Are you shure you want to delete ' + personToDelete.name + ' ?')) {
      deletePerson(id)
        .then((personDeleted) => {
          console.log(personDeleted, 'deleted');
          setPersons(persons.filter((person) => person.id !== id))
        })
    }

    

  }

  const filterNames = () => {
    return persons.filter((person) => {
      if(filterName === '') return person;
      return person.name.toLowerCase() === filterName.toLowerCase();
    }).map((person) => (<Person key={person.id} person={person} handleDelete={handleDelete}/>));
  }

  console.log(persons);
  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} />
        <Error errorMessage={errorMessage} />
        <Filter filter={filterName} setFilter={setFilterName} />
      <h2>Add a new</h2>
        <PersonForm 
          newName={newName} 
          newNumber={newNumber}
          setNewName={setNewName} 
          setNewNumber={setNewNumber} 
          handleSubmit={handleSubmit} 
        />
      <h2>Numbers</h2>
       <Persons filterNames={filterNames} />
    </div>
  )
}

export default App;