const CountriesToShow = ({countryList, handleClick}) => {
    if (countryList === null) {
        return null
    }
    return (
        <div>
            <ul>
                {countryList.map(country =>
                <div key={country}>
                    <li>{country}</li>
                    <button key={country} onClick={() => handleClick(country)}>show</button>
                </div> 
                )}
            </ul>
        </div>
    )
    }

export default CountriesToShow
