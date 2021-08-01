// Llamada al modulo pg, objeto Pool
const { Pool } = require('pg');

// Objeto pool que contendrá los datos necesario para la conexión de la BD de postgresql
const pool = new Pool({
    host = 'localhost',
    user = 'postgres',
    password = '12345',
    database = 'book_rental',
    port = '5432'
});

// Exportamos el objeto pool
module.exports = { pool }