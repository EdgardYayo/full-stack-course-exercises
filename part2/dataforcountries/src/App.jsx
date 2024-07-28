import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import { getAll, getWeatherForCountryCapital } from './services/countries';
import Countries from './components/Countries';

const App = () => {
  const [country, setCountry] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  // To get all countries
  useEffect(() => {
      getAll(country)
        .then((countries) =>
          // console.log(countries)
          setCountries(countries) 
        );
  }, [])

  // To filter specific country or countries
  useEffect(() => {
    if(country) {
      const matches = countries.filter((cty) => {
        return cty.name?.official.toLowerCase().includes(country.toLowerCase()) ||
                cty.name?.common.toLowerCase().includes(country.toLowerCase())
      });
      
      console.log(matches);
      if(matches.length === 1) {
        getWeatherForCountryCapital(matches[0].capitalInfo.latlng[0], matches[0].capitalInfo.latlng[1])
          .then((weather) => setWeatherData(weather));
          setFilteredCountries(matches);
          return;
      }

      setFilteredCountries(matches);
    } else {
      setFilteredCountries([]);
    }

  }, [country])

  // To access the detail of a country
  const handleShow = (name) => {
    const countryToShow = countries.find((cty) => cty.name.common === name);
    console.log(countryToShow);
    getWeatherForCountryCapital(countryToShow.capitalInfo.latlng[0], countryToShow.capitalInfo.latlng[1])
          .then((weather) => setWeatherData(weather));
    setFilteredCountries([countryToShow]);
  }

  // console.log(weatherData);
  return (
    <main>
      <SearchBar country={country} setCountry={setCountry}/>
      <Countries countries={filteredCountries} handleShow={handleShow} weather={weatherData}/>
    </main>
  )
}

export default App
