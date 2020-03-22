import React from 'react';

const Countries = ({countries, setFilter}) => {

    const handleFilterChange = (event) => {
        setFilter(event.target.id)
      }

    if(countries.length > 10) 
        return <p>Too many matches, specify another filter</p>

    if(countries.length === 1)
        return(
            <div>
                {countries.map(country =>
                    <div key={country.name +' div'}>
                        <h1 key={country.name}>
                            {country.name}
                        </h1>
                        <p key={country.name + ' capital'}>
                            capital {country.capital}
                        </p>
                        <p key={country.name + ' population'}>
                            population {country.population}
                        </p>
                        <h2 key={country.name+' languages'}>
                            languages
                        </h2>
                        <ul key={country.name+' languages list'}>
                            {country.languages.map((language,i) => 
                                <li key={country.name+' langugage '+i}>
                                    {language.name}
                                </li>
                            )}
                        </ul>
                        <img 
                            width="100" 
                            height="100" 
                            key={country.name + ' flag'} 
                            alt='flag' 
                            src={country.flag}>
                        </img>
                    </div> 
                )}
            </div>
        )

    return (
        <div>
            {countries.map(country => 
                <div key={country.name +' div'}>
                    <p key={country.name}>
                        {country.name}
                        <button id={country.name} key={country.name+' show'} onClick={handleFilterChange}>show</button>
                    </p>
                    
                </div>
            )}
        </div>
    )
}

export default Countries