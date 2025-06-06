import express from 'express'
import data from "./dataBase.js";
const items = data.items;

const port = 3001;
const app = express()

app.get('/api/character/', (req, res) => {
   res.status(200).json(items);
})

app.get("/api/character/:id", (req, res) => {
  const { id } = req.params;
  const personajes = items.find((personaje)=> personaje.id === parseInt(id))
  if (!personajes){
    return res.status(404).json({error: 'Personaje de la API no encontrado'})
  }
    
    console.log(`Personaje de ${personajes.name} con ID ${id}`)

    res.status(200).json(personajes);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
