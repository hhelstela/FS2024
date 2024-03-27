const SingleCountry = ({country}) => {
    if (country === null) {
        return null
      }
    const languages = Object.keys(country.languages).map(lang => country.languages[lang])
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital.at(0)}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {languages.map(lang => 
                    <li key={lang}>{lang}</li>
                )}
            </ul>
        </div>
    )
}

export default SingleCountry