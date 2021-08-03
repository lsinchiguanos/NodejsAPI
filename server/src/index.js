// Importamos el módulo de express
const express = require("express");

// Declaramos una constante apuntando a la variable de express
const app = express();
//configuramos puerto
app.set("port", process.env.PORT || 3000);
// Especificamos el formato de envío de datos, nuestro caso JSON
app.use(express.json());
//configuracion de cabeceras para ajax
var cors = require('cors')
// cors
app.use(cors())
app.options('*', cors()) 

// En caso de querer trabajar con imágenes, establecemos un true o false
app.use(express.urlencoded({ extended: true }));

// Dando acceso a la peticiones


// Añadimos la rutas
app.use(require('../src/routes/index'));

// Asignamos el puerto donde estará escuchando y respondiendo las peticiones
app.listen(app.get("port"), () => {
  console.log("Servidor iniciado en el puerto 3000");
});
