import express from 'express'
import data from "./dataBase.js"; //acá traemos nuestra base de datos, en este caso un archivo que exporta data.

//--------------------------------- Configuramos el puerto y express
const port = 3001;  //el puerto donde va a estar escuchando nuestro servidor
const app = express()  //inicializamos express, esto es lo que nos permite armar las rutas y manejar las peticiones
const items = data.items; //busca lo que hay dentro de data (o sea los items)


// ----------------------------------Ruta para obtener todos los personajes
app.get('/api/characters', (req, res) => {  // Cuando alguien haga un GET a esta ruta, devolvemos todos los personajes
    console.log("Obteniendo la lista de personajes de la MiniAPI-DragonBall") //esto es solo para que nos aparezca en consola que se pidió esta info
    res.setHeader("Content-Type", "application/json"); //le decimos al cliente que lo que va a recibir es JSON 
    res.json({items}); //y finalmente mandamos todos los personajes
})




// ----------------------------------Ruta para obtener un personaje específico por su ID
app.get('/api/characters/:id', (req, res) => {  // esta ruta se activa si te mandan un id, por ejemplo /api/characters/5
    console.log(`Obteniendo personaje con ID: ${req.params.id}`); //nos muestra en consola qué ID están buscando

    const id = req.params.id;  //extraemos el id de los parámetros de la URL
    const idNumber = parseInt(id);  //lo convertimos a número (porque viene como texto)

  // Si el ID no es un número, devolvemos un error 400 (bad request)
    if (isNaN(idNumber)) {
       //esto es como decir "che, lo que me pasaste como ID no es un número, así que no te lo puedo buscar"
        return res.status(400).json({
            message: 'Invalid parameter: ID must be a number',
            error: 'Bad Request',
            statusCode: 400,
        });
    }
    // Recorremos el array de personajes para ver si hay alguno con ese ID
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === idNumber) {
          // si encontramos uno que tenga ese ID, lo devolvemos
            res.setHeader('Content-Type', 'application/json');
            return res.json(items[i]);
        }
    }
       // si terminó el for y no encontró nada, tiramos un error 404 (no encontrado)
      return res.status(404).json({
        error: 404,
        message: 'Id no encontrada.', //básicamente "no hay ningún personaje con ese ID"
    });
  
  
});

app.use((req, res) => { //aquí como todo lo que NO coincidió antes (por eso va al final) se ejecuta tirando un Not Found, teniendo en cuenta que express se lee como un libro, si nada de antes coincidió llegara a este parámetro 
  return res.status(404).json({  // si ninguna de las rutas anteriores se activó, significa que el usuario pidió algo que no existe
  "message": "No such file or directory",
  "error": "Not Found",
  "statusCode": 404
})});

// Acá levantamos el servidor
app.listen(port, () => { //esto lo que hace es ejecutar por consola cuando el servidor está corriendo correctamente
  console.log(`Servidor corriendo en http://localhost:${port}/api/characters`);
});
// http://localhost:3001/api/character el link del servidor