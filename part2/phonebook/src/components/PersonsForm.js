import React from 'react'
import Input from './Input'
import Button from './Button'

const PersonsForm = ({addPerson, newName, newNumber, changeNameInput, changeNumberInput}) => {
    return (
        <>
            <form onSubmit={addPerson}>
                name: <Input value={newName} handler={changeNameInput}/>
                number: <Input value={newNumber} handler={changeNumberInput}/>
                <Button text={"add"}/>
            </form>
        </>
    );
}

export default PersonsForm