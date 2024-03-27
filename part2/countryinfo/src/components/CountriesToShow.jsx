const CountriesToShow = ({countryList}) => {
    if (countryList === null) {
        return null
    }
    return (
        <div>
            <ul>
                {countryList.map(country => 
                    <li>{country}</li>)}
            </ul>
        </div>
    )
    }

export default CountriesToShow
