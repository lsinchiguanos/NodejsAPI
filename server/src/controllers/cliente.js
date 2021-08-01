// Importamos el archivo de conexión a la base de datos
const { pool } = require('../database/conexion');

// Creamos una variable de conexión
const db = pool;

// Creamos la función que devuelve todos los registros
const getClientes = async (req, res) => {
    const sentencia = `SELECT cliente_id, cliente_tipo_dni, cliente_dni, cliente_apellido_paterno, cliente_apellido_materno, cliente_primer_nombre, cliente_segundo_nombre, cliente_telefono, cliente_email WHERE cliente_estado LIKE 'Activo';`;
    const registros = await db.query(sentencia);
    res.json(registros.rows);
};

// Creamos la función para consultar libros por: código, titulo, autor, anio
const searchCliente = async (req, res) => {
    const sentencia = `SELECT cliente_id, cliente_tipo_dni, cliente_dni, cliente_apellido_paterno, cliente_apellido_materno, cliente_primer_nombre, cliente_segundo_nombre, cliente_telefono, cliente_email WHERE cliente_estado LIKE 'Activo' AND cliente_dni LIKE $1;`
    const dni = req.params.dni;
    const sCliente = await db.query(sentencia, [dni]);
    res.json(sCliente.rows);
};

// Creamos la función para registrar libros
const newCliente = async (req, res) => {
    const sentencia = 'INSERT INTO public.cliente(cliente_tipo_dni, cliente_dni, cliente_apellido_paterno, cliente_apellido_materno, cliente_primer_nombre, cliente_segundo_nombre, cliente_telefono, cliente_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
    const { tipo_dni, cliente_dni, apellido_paterno, apellido_materno, primer_nombre, segundo_nombre, telefono, email } = req.body;
    const nCliente = await db.query(sentencia, [tipo_dni, cliente_dni, apellido_paterno, apellido_materno, primer_nombre, segundo_nombre, telefono, email]);
    res.json('Libro registrado con éxito');
};

// Creamos la función de actualizar datos
const updCliente = async (req, res) => {
    const idCliente = req.params.id;
    const sentencia = 'UPDATE public.book SET cliente_tipo_dni=$1, cliente_dni=$2, cliente_apellido_paterno=$3, cliente_apellido_materno=$4, cliente_primer_nombre=$5, cliente_segundo_nombre=$6, cliente_telefono=$7, cliente_email=$8, updated_at=CURRENT_TIMESTAMP WHERE cliente_id=$9';
    const { tipo_dni, cliente_dni, apellido_paterno, apellido_materno, primer_nombre, segundo_nombre, telefono, email } = req.body;
    const ubook = await db.query(sentencia, [tipo_dni, cliente_dni, apellido_paterno, apellido_materno, primer_nombre, segundo_nombre, telefono, email, idCliente]);
    res.json('Libro registrado con éxito');
};

// Creamos la función para eliminar un libro por: código
const delCliente = async (req, res) => {
    const sentencia = 'UPDATE public.cliente SET cliente_estado=$1, updated_at=CURRENT_TIMESTAMP WHERE cliente_id = $2;';
    const idCliente = req.params.id;
    const dCliente = await db.query(sentencia, ['Inactivo', idCliente]);
    res.json('Libro eliminado con éxito');
};

// Exportamos las funciones necesarias
module.exports = {
    getClientes,
    searchCliente,
    newCliente,
    updCliente,
    delCliente
}