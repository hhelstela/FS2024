import { useEffect, useState } from 'react'
import infoService from './services/info'
import SingleCountry from './components/SingleCountry'
import CountriesToShow from './components/CountriesToShow'
import RenderImage from './components/RenderImage'

const App = () => {
  const [count, setCount] = useState(0)
  const [searchField, setSearchField] = useState('')
  const [foundInfo, setFoundInfo] = useState([])
  const [countryInfo, setCountryInfo] = useState([])
  const [singleCountry, setSingleCountry] = useState(null)
  const [countriesToShow, setCountriesToShow] = useState(null)
  const [imageLink, setImageLink] = useState(null)

  useEffect(() => {
    infoService
      .getAll()
      .then(initialCountryInfo => {
        setCountryInfo(initialCountryInfo)
      })
  }, [])


  const handleFoundInfo = (searchFieldUpdated) => {
    const filteredCountries = countryInfo.filter(country => country.name.common.toLowerCase().includes(searchFieldUpdated.toLowerCase()))
    if (filteredCountries.length === 1) {
      setFoundInfo(filteredCountries)
      setSingleCountry(filteredCountries.at(0))
      setCountriesToShow(null)
      setImageLink(filteredCountries.at(0).flags.png)
    }
    else if (filteredCountries.length <= 10) {
        setFoundInfo(filteredCountries)
        setSingleCountry(null)
        setCountriesToShow(filteredCountries.map(country => country.name.common))
        setImageLink(null)
    } 
    else {
        setFoundInfo([])
        setSingleCountry(null)
        setCountriesToShow(null)
        setImageLink(null)
    }
  }

  const handleSearchChange = (event) => {
    setSearchField(event.target.value)
    handleFoundInfo(event.target.value)
  }

 
  return (
    <div>
      <form>
        find countries <input value={searchField} onChange={handleSearchChange}/>
      </form> 
      <SingleCountry country={singleCountry}></SingleCountry>
      <CountriesToShow countryList={countriesToShow}></CountriesToShow>
      <RenderImage imageLink={imageLink}></RenderImage>
    </div>
  )

  }

export default App
