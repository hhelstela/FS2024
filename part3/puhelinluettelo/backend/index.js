const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('data', function (request, response) {
    return JSON.stringify(request.body)
  })
app.use(morgan(':method :url :status :res[content-length] :data - :response-time ms'))
  

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
      },
      {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5233523"
      },
      {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234235"
      },
      {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
      }
]

app.get('/api/persons', (request, response) => {
    response.send(persons)
})
app.get('/info', (request, response) => {
    const date = new Date().toString()
    console.log(date)
    response.send(`<div>
                    <p>Phonebook has info for ${persons.length} people</p>
                    <p>${date}</p>
                  </div>`)
})


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random() * 10000)
    const body = request.body

    if (!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    }
    if (!body.number) {
      return response.status(400).json({
        error: 'number missing'
      })
    }

    if (persons.map(person => person.name).includes(body.name)) {
      console.log('name is already in the phonebook')
      return response.status(400).json({
        error: 'name already in phonebook'
      })
    }
    
    const person = {
      name: body.name,
      number: body.number,
      id: id
    }
    persons = persons.concat(person)

    response.json(person)
})
        
    

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})