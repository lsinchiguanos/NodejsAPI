// Importamos el archivo de conexión a la base de datos
const { pool } = require('../database/conexion');

// Creamos una variable de conexión
const db = pool;

// Creamos la función que devuelve todos los registros
const getBooks = async (req, res) => {
    const sentencia = `SELECT book_id, book_codigo, book_titulo, book_autor, book_anio, book_editorial, book_edicion, book_isbn, book_stock, book_precio FROM public.book WHERE book_estado != 'Eliminado';`;
    const registros = await db.query(sentencia);
    res.json(registros.rows);
};

// Creamos la función para consultar libros por: código, titulo, autor, anio
const searchBook = async (req, res) => {
    const sentencia = `SELECT book_id, book_codigo, book_titulo, book_autor, book_anio, book_editorial, book_edicion, book_isbn, book_stock, book_precio FROM public.book WHERE book_codigo LIKE $1 OR book_titulo LIKE $2 OR book_autor LIKE $3 OR book_anio = $4 AND book_estado != 'Eliminado';`
    const { codigo, titulo, autor, anio } = req.body;
    const sBook = await db.query(sentencia, [codigo, titulo, autor, anio]);
    res.json(sBook.rows);
};

// Creamos la función para registrar libros
const newBook = async (req, res) => {
    const sentencia = 'INSERT INTO public.book(book_codigo, book_titulo, book_autor, book_anio, book_editorial, book_edicion, book_isbn, book_stock, book_precio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
    const { codigo, titulo, autor, anio, editorial, edicion, isbn, stock, precio } = req.body;
    const nbook = await db.query(sentencia, [codigo, titulo, autor, anio, editorial, edicion, isbn, stock, precio]);
    res.json('Libro registrado con éxito');
};

// Creamos la función de actualizar datos
const updBook = async (req, res) => {
    const idBook = req.params.id;
    const sentencia = 'UPDATE public.book SET book_codigo=$1, book_titulo=$2, book_autor=$3, book_anio=$4, book_editorial=$5, book_edicion=$6, book_isbn=$7, book_stock=$8, updated_at=CURRENT_TIMESTAMP, book_precio=$9 WHERE book_id=$10';
    const { codigo, titulo, autor, anio, editorial, edicion, isbn, stock, precio } = req.body;
    const ubook = await db.query(sentencia, [codigo, titulo, autor, anio, editorial, edicion, isbn, stock, precio, idBook]);
    res.json('Libro registrado con éxito');
};

// Creamos la función para eliminar un libro por: código
const delBook = async (req, res) => {
    const sentencia = 'UPDATE public.book SET book_estado=$1, updated_at=CURRENT_TIMESTAMP WHERE book_id = $2;';
    const idBook = req.params.id;
    const dbook = await db.query(sentencia, ['Eliminado', idBook]);
    res.json('Libro eliminado con éxito');
};

// Exportamos las funciones necesarias
module.exports = {
    getBooks,
    searchBook,
    newBook,
    updBook,
    delBook
}