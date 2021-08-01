// Importamos el módulo de Express pero solo la función Router
const { Router } = require('express');
const router = Router();

// Agregamos el archivo con la ruta que deseamos utilizar
const { searchBook, updBook, newBook, delBook, getBooks } = require('../src/controllers/book');  // ruta de los métodos de book

// Asignamos las rutas con sus subfijos y métodos a invocar
router.get('/books', getBooks);                 // Obtiene todos los libros
router.get('/book', searchBook);                // Busca los libros según los parámetros
router.post('/book', newBook);                  // Registra un nuevo libro
router.delete('/book/:idBook', delBook);        // Elimina un libro por idBook
router.put('/book/:idBook', updBook);           // Actualiza un libro por idBook

module.exports = { router }