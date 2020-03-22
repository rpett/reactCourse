import React from 'react';

const Persons = ({personsToShow}) => {
    return(
        <div>
            {personsToShow.map((person, i) => <p key={i}>{person.name} {person.number}</p>)}
      </div>
    )
}

export default Persons