const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Bom dia mundo!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const date = new Date()
  const p = persons.map(p => p.id)
  const person = p.length
  res.send(
    `Phonebook has info for ${person} people
    ${date}
    `)  
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  
  if (!person) {
    res.status(404).end()
  } else {
    res.json(person)
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

const generateId = () => {
  const personIds = persons.map(p => p.id);
  const maxId = Math.max(...personIds)
  const randomNum = Math.floor(Math.random() * maxId + 1) + maxId + 1
  return randomNum;
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  const name = body.name 
  const personExist = persons.find(p => p.name === name)

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'missing something'
    })
  } else if (personExist) {
    return res.status(400).json({
      error: 'This name already exist'
    })
  }

  const person = {
    id: generateId(),
    name: body.name, 
    number: body.number
  }

  persons = persons.concat(person)

  res.json(person)

}) 

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 