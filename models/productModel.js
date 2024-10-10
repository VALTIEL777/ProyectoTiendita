// models/productModel.js
const pool = require('../config/config');

// Obtener todos los productos
const getAllProducts = async () => {
    const result = await pool.query('SELECT * FROM productos');
    return result.rows;
};

// Obtener un producto por ID
const getProductById = async (id) => {
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    return result.rows[0];
};

// Crear un nuevo producto
const createProduct = async (product) => {
    const { nombre, precio, stock_min, stock_max, existencias, sku } = product;
    const result = await pool.query(
        'INSERT INTO productos (nombre, precio, stock_min, stock_max, existencias, sku) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [nombre, precio, stock_min, stock_max, existencias, sku]
    );
    return result.rows[0];
};

// Actualizar un producto
const updateProduct = async (id, product) => {
    const { nombre, precio, stock_min, stock_max, existencias, sku } = product;
    const result = await pool.query(
        'UPDATE productos SET nombre = $1, precio = $2, stock_min = $3, stock_max = $4, existencias = $5, sku = $6 WHERE id = $7 RETURNING *',
        [nombre, precio, stock_min, stock_max, existencias, sku, id]
    );
    return result.rows[0];
};

// Eliminar un producto
const deleteProduct = async (id) => {
    const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

// Buscar productos por cualquier campo
const searchProducts = async (query) => {
    const result = await pool.query(
        `SELECT * FROM productos 
         WHERE nombre ILIKE $1 
         OR CAST(precio AS TEXT) ILIKE $1
         OR CAST(stock_min AS TEXT) ILIKE $1
         OR CAST(stock_max AS TEXT) ILIKE $1
         OR CAST(existencias AS TEXT) ILIKE $1
         OR sku ILIKE $1`,
        [`%${query}%`]
    );
    return result.rows;

};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
};
