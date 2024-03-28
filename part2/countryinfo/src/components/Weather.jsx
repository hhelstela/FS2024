const Weather = ({weather}) => {
    if (weather === null) {
        return null
    }
    if (weather === undefined) {
        return null
    }
    return (
        <div>
            <h2>Weather in </h2>
            <p>temperature {Math.round((weather[0] - 273.15) * 100) /100} Celsius</p>
            <img src={'https://openweathermap.org/img/wn/' + weather[2] + '@2x.png'}/>
            <p> wind {weather[1]} m/s</p>
        </div>
    )
}

export default Weather