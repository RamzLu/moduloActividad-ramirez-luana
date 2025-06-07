import express from 'express'
import data from "./dataBase.js"; //imposta nuestra base de datos
const items = data.items; //busca lo que hay dentro de data (o sea los items)

const port = 3001;
const app = express()

app.get('/api/character/', (req, res) => { //ruta para mostrar todos los items
   res.status(200).json(items);
})

app.get("/api/character/:id", (req, res) => { //ruta para buscar por id
  const { id } = req.params; // esto tambien se entiende como const id = req.params.id; .. Lo que hace es desestructurar y acceder al ":id"

// evalua si el id ingresado es un numero, va primero ya que si lo ponemos después jamás se va a evaluar
   if (isNaN(parseInt(id))){ //Pregunta si es un número (is Not a Number?) si no es un numero tira error, pero si es convinado por ejemplo "10x" arroja el id 10 en este caso
    return res.status(400).json({
    "message": "Invalid parameter ID must be a number",
    "error": "Bad Request",
    "statusCode": 400
});
 }
  const personajes = items.find((personaje)=> personaje.id === parseInt(id)) //Va a la data base y entra en data.items(ya delclarado arriba) y busca el parámetro id

// ahora verifica si el id (ya validado) existe
  if (!personajes){
    return res.status(404).json({ //sino existe tira este error
    "message": "Character ID not found",
    "error": "Not Found",
    "statusCode": 404
})
}



    // llega hasta aquí si todo está bien ;)
    console.log(`Personaje de ${personajes.name} con ID ${id}`)
    res.status(200).json(personajes);
});

app.use((req, res) => { //aquí como todo lo que NO coincidió antes (por eso va al final) se ejecuta tirando un Not Found, teniendo en cuenta que express se lee como un libro, si nada de antes coincidió llegara a este parámetro 
  return res.status(404).json({
  "message": "No such file or directory",
  "error": "Not Found",
  "statusCode": 404
})


})

app.listen(port, () => { //esto lo que hace es ejecutar por consola cuando el servidor está corriendo correctamente
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
// http://localhost:3001/api/character/ el link del servidor