import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (name) => {
    return axios.get('http://api.openweathermap.org/geo/1.0/direct?q=' + name + '&limit=1&appid=' + api_key)
        .then(response => {
            const lat = response.data[0].lat
            const lon = response.data[0].lon
            return axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + api_key)
        })
        .then(response => {
            return response.data
        })
}

export default {getWeather}