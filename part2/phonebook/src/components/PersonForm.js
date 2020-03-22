import React from 'react';

const PersonForm = ({formValues}) => {
    return(
        <form onSubmit={formValues.addNewName}>
            <div>
            name: <input value={formValues.newName} onChange={formValues.handleNameChange}/>
            </div>
            <div>
            number: <input value={formValues.newNumber} onChange={formValues.handleNumberChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm