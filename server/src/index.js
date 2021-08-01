// Importamos el módulo de express
const express = require('express');

// Declaramos una constante apuntando a la variable de express
const app = express();

// Especificamos el formato de envío de datos, nuestro caso JSON
app.use(express.json());

// En caso de querer trabajar con imágenes, establecemos un true o false
app.use(express.urlencoded({extended: true}));

// Añadimos la rutas
app.use(require('../src/routes/index'));


// Asignamos el puerto donde estará escuchando y respondiendo las peticiones
app.listen(3000);