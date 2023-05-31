import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Country from './components/Country'
import countryService from './services/countries'
 


const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleClick = (country) => {
    setSelectedCountry(country)
  }

  useEffect(() => {
    console.log('effect')
    countryService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.filter(country => country.name.common.toLowerCase().includes(newFilter)))
      })
  }, [newFilter])

  const handlefilterChange = (event) => {
    console.log('Filter change', event.target.value)
    setNewFilter(event.target.value)
    setSelectedCountry(null)
  }

  if (countries.length > 10) {
    return (
      <div> 
        <Filter value={newFilter} onChange={handlefilterChange}/> 
        <div>Too many matches, specify another filter</div>
      </div>
    )
  }else {
    if (countries.length === 1) {
      return (
        <div>
          <Filter value={newFilter} onChange={handlefilterChange}/>
          <Country country={countries[0]}/>
        </div>
      )
    }else {
      return  (
        <div>
          <Filter value={newFilter} onChange={handlefilterChange}/>
          {countries.map(country => (
          <div key={country.name.common}>{country.name.common} <button onClick={() => handleClick(country)}>show</button></div>))}
          {selectedCountry && <Country country={selectedCountry}/>}
        </div>
      )
    }
  }
}

export default App;