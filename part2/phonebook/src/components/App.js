import React, { useState, useEffect } from 'react'
import servisePersons from '../services/persons'

import Filter from './Filter'
import PersonsForm from './PersonsForm'
import Person from './Person'
import Persons from './Persons'

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterName, setFilterName] = useState('');

    const [showAllNames, setShowAllNames] = useState(true);

    useEffect(() => {
        servisePersons.getAll()
            .then((initialPersonsList) => {
                setPersons(initialPersonsList);
            })
    }, []);


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

    const checkName = (n) => {
        return persons.find((person) => {
            return person.name.toLocaleLowerCase() === n.toLocaleLowerCase();
        }) === undefined ? true : false;
    }

    const addPerson = (event) => {
        event.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber
        }

        const name = checkName(newPerson.name);

        if (name) {
            servisePersons.create(newPerson)
                .then(() => {
                    setPersons(persons.concat(newPerson));
                });

            setNewName("");
            setNewNumber("");
            setFilterName("");
        }

        else {
            updateNumber(newPerson);
        }
    }

    const updateNumber = (person) => {
        const personToUpdate = persons.find((p) => {
            return p.name === person.name;
        });

        const updatedPerson = {
            ...personToUpdate,
            number: person.number
        }

        const response = window.confirm(`${updatedPerson.name} exists. Do you want to update the number?`);
        if (response) {
            servisePersons.update(updatedPerson.id, updatedPerson)
                .then((updated) => {
                    setPersons(persons.map((person) => {
                        return person.id !== updated.id ? person : updated;
                    }));
                });
            setNewName('');
            setNewNumber('');
            setFilterName('');
        }
        else return;
    }

    const deletePerson = (id) => {
        const response = window.confirm(`Delete ${persons.find(person => person.id === id).name}?`);
        if (response) {
            servisePersons.remove(id).then(() => {
                console.log('deleted');
                const updatedPersons = persons.filter((person) => {
                    return person.id !== id;
                });
                setPersons(updatedPersons);
            });
        }
        else return;
    }


    const renderNames = () => namesToDisplay.map((person) => {
        return (
            <Person key={person.name} name={person.name} number={person.number} handler={() => deletePerson(person.id)} />
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