import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';
import Filter from './components/Filter';
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('Sudan')

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${filter}`)
      .then(response => {
          setCountries(response.data)
      })
      .catch((error) => {})
  })

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Countries countries={countries} setFilter={setFilter} />
    </div>
  );
}

export default App;
