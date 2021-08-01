// Importamos el módulo de Express pero solo la función Router
const { Router } = require('express');
const router = Router();

// Agregamos el archivo con la ruta que deseamos utilizar
const { getBooks, searchBook, newBook, updBook, delBook } = require('../src/controllers/book');  // ruta de los métodos de book
const { getClientes, searchCliente, newCliente, delCliente, updCliente } = require('../src/controllers/cliente');  // ruta de los métodos de cliente

// Asignamos las rutas con sus subfijos y métodos a invocar
router.get('/books', getBooks);                 // Obtiene todos los libros
router.get('/book', searchBook);                // Busca los libros según los parámetros
router.post('/book', newBook);                  // Registra un nuevo libro
router.delete('/book/:idBook', delBook);        // Elimina un libro por idBook
router.put('/book/:idBook', updBook);           // Actualiza un libro por idBook

// Asignamos las rutas con sus subfijos y métodos a invocar
router.get('/clientes', getClientes);                 // Obtiene todos los libros
router.get('/cliente/:dni', searchCliente);                // Busca los libros según los parámetros
router.post('/cliente', newCliente);                  // Registra un nuevo libro
router.delete('/cliente/:idCliente', delCliente);        // Elimina un libro por idBook
router.put('/cliente/:idCliente', updCliente);           // Actualiza un libro por idBook

module.exports = { router }