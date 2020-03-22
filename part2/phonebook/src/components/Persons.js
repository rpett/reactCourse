import React from 'react';

const Persons = ({personsToShow, deleteHandler}) => {
    return(
        <div>
            {personsToShow.map((person, i) => 
            <p key={i}>
                {person.name} {person.number}
                <button key={i+' delete'} onClick={() => deleteHandler(person.id, person.name)}>delete</button>
            </p>
            )}
        </div>
    )
}

export default Persons