const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let persons = [
    {
        name: 'Henri',
        number: '054352345',
        id: 1
    },
    {
        name: 'Liisa',
        number: '054352345',
        id: 2
    }
]

app.get('/api/persons', (request, response) => {
    response.send(persons)
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

app.post('/api/persons', (request, response) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})
        
    

const PORT =  3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})