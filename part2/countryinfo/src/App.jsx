import { useEffect, useState } from 'react'
import infoService from './services/info'
import SingleCountry from './components/SingleCountry'
import CountriesToShow from './components/CountriesToShow'
import RenderImage from './components/RenderImage'
import apiCalls from './services/apiCalls'
import Weather from './components/Weather'

const App = () => {
  const [searchField, setSearchField] = useState('')
  const [foundInfo, setFoundInfo] = useState([])
  const [countryInfo, setCountryInfo] = useState([])
  const [singleCountry, setSingleCountry] = useState(null)
  const [countriesToShow, setCountriesToShow] = useState(null)
  const [imageLink, setImageLink] = useState(null)
  const [weatherInfo, setWeatherInfo] = useState(null)

  useEffect(() => {
    infoService
      .getAll()
      .then(initialCountryInfo => {
        setCountryInfo(initialCountryInfo)
      })
  }, [weatherInfo])


  const handleFoundInfo = (searchFieldUpdated) => {
    const filteredCountries = countryInfo.filter(country => country.name.common.toLowerCase().includes(searchFieldUpdated.toLowerCase()))
    if (filteredCountries.length === 1) {
      setFoundInfo(filteredCountries)
      setSingleCountry(filteredCountries.at(0))
      setCountriesToShow(null)
      setImageLink(filteredCountries.at(0).flags.png)
      apiCalls.getWeather(filteredCountries.at(0).capital.at(0)).then(response => {
        const temperature = response.main.temp
        const wind = response.wind.speed
        const icon = response.weather[0].icon
        setWeatherInfo([temperature, wind, icon])
      })
    }

    else if (filteredCountries.length <= 10) {
        setFoundInfo(filteredCountries)
        setSingleCountry(null)
        setCountriesToShow(filteredCountries.map(country => country.name.common))
        setImageLink(null)
        setWeatherInfo(null)
    } 
    else {
        setFoundInfo([])
        setSingleCountry(null)
        setCountriesToShow(null)
        setImageLink(null)
        setWeatherInfo(null)
    }
  }

  const handleSearchChange = (event) => {
    setSearchField(event.target.value)
    handleFoundInfo(event.target.value)
  }

  const handleShowClick = (countryName) => {
    setSearchField(countryName)
    handleFoundInfo(countryName)
  }

 
  return (
    <div>
      <form>
        find countries <input value={searchField} onChange={handleSearchChange}/>
      </form> 
      <SingleCountry country={singleCountry}></SingleCountry>
      <CountriesToShow countryList={countriesToShow} handleClick={handleShowClick}></CountriesToShow>
      <RenderImage imageLink={imageLink}></RenderImage>
      <Weather weather={weatherInfo}  ></Weather>
    </div>
  )

  }

export default App
