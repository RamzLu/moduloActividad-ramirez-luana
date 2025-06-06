import express from 'express'

const app = express()

app.get('/api/character/', (req, res) => {
  res.send('Hello World')
})

app.listen(3001, () => {
    console.log("Servidor corriendo en http://localhost:3001");
})