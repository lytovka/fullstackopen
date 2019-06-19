import React, { useState } from 'react'
import Filter from './Filter'
import PersonsForm from './PersonsForm'
import Person from './Person'
import Persons from './Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterName, setFilterName] = useState('');

    const [showAllNames, setShowAllNames] = useState(true);

    const namesToDisplay = showAllNames ? persons : persons.filter((person) => {
        return person.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase());
    });

    const changeNameInput = (event) => {
        setNewName(event.target.value);
    }
    const changeNumberInput = (event) => {
        setNewNumber(event.target.value);
    }
    const filterByName = (event) => {
        setFilterName(event.target.value);
        setShowAllNames(false);
    }

    const isAdded = (n) => {
        return persons.map((person) => {
            return person.name.toLocaleLowerCase();
        }).indexOf(n.toLocaleLowerCase());
    }

    const addPerson = (event) => {
        event.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber
        }
        if (isAdded(newPerson.name) === -1) {
            setPersons(persons.concat(newPerson));
            setNewName("");
            setNewNumber("");
        }
        else {
            alert(`Sorry, but ${newPerson.name} seems to be present in our records`);
        }
    }

    const renderNames = () => namesToDisplay.map((person) => {
        return (
            <Person key={person.name} name={person.name} number={person.number} />
        );
    });

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filterName} handler={filterByName} />
            <h3>Add a new contact</h3>
            <PersonsForm addPerson={addPerson} newName={newName} changeNameInput={changeNameInput} newNumber={newNumber}
                changeNumberInput={changeNumberInput} />
            <h2>Numbers</h2>
            <Persons handler={renderNames()} />
        </div>
    )
}

export default App