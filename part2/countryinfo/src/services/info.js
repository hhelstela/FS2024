import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    return request.then(response => response.data)
}

const getByName = (name) => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/name/' + name)
    return request.then(response => response.data)
}

export default {getAll, getByName}