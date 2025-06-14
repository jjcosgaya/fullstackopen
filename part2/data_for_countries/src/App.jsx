import { useState, useEffect, use } from 'react'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()));
  
  useEffect(() => {
    fetch(baseUrl + 'all')
      .then(res => res.json())
      .then(data => setCountries(data))
  },[])

  return(
    <>
      <SearchBar query={query} setQuery={setQuery}/>
      <DisplayCountries countries={filteredCountries} setQuery={setQuery} />
    </>
  )
}

const SearchBar = ({query, setQuery}) => {
  return(
    <label>
      find countries  
      <input onChange={e => setQuery(e.target.value)} value={query} placeholder='search...'></input>
    </label>
  )
}

const DisplayCountries = ({countries, setQuery}) => {
  const countryNames = countries.map(country => country.name.common);
  const moreThanTen = countryNames.length > 10;
  const onlyOne = countryNames.length === 1;
  const [uniqueCountry, setUniqueCountry] = useState(null);
  
  const handleClick = country => setQuery(country);
  
  if (onlyOne && !uniqueCountry) {
    fetch(baseUrl + 'name/' + countryNames[0])
      .then(res => res.json())
      .then(res => setUniqueCountry(res))
  }
  else if (!onlyOne && uniqueCountry) setUniqueCountry(null);
  
  
  if (uniqueCountry) {
    return(
      <>
        <h1>{uniqueCountry.name.common}</h1> 
        <p>Capital {uniqueCountry.capital}</p>
        <p>Area {uniqueCountry.area}</p>
      
        <h2>Languages</h2>
          <ul>
            {Object.values(uniqueCountry.languages).map(lang => <li key={lang}>{lang}</li>)}
          </ul>
        <img src={uniqueCountry.flags.svg} alt={uniqueCountry.flags.alt} />
      </>
    )
  }

  return(
    <>
      {
      moreThanTen ?
        <p>Too many matches, please specify another filter</p> :
        countryNames.map(country => <li key={country}>{country}<button onClick={() => handleClick(country)}>Show</button></li>)
        
        } 
    </> 
  )
}

export default App
