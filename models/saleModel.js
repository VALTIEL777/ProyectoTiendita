const pool = require('../config/config');

// Obtener los detalles de una venta por el ID de la venta
const getSaleDetailsBySaleId = async (saleId) => {
    const { rows } = await pool.query('SELECT * FROM sale_details WHERE sale_id = $1', [saleId]);
    return rows;
};

// Crear un nuevo detalle de venta
const createSaleDetail = async (saleId, productName, quantity, price) => {
    const { rows } = await pool.query(
        'INSERT INTO sale_details (sale_id, product_name, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
        [saleId, productName, quantity, price]
    );
    return rows[0];
};

// Eliminar un detalle de venta por ID
const deleteSaleDetail = async (id) => {
    await pool.query('DELETE FROM sale_details WHERE id = $1', [id]);
};


// Obtener todas las ventas
const getSales = async () => {
    const { rows } = await pool.query('SELECT * FROM sales ORDER BY date DESC');
    return rows;
};

// Obtener una venta por ID
const getSaleById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM sales WHERE id = $1', [id]);
    return rows[0];
};

// Crear una nueva venta
const createSale = async (total) => {
    const result = await pool.query(
        'INSERT INTO sales (total) VALUES ($1) RETURNING *',
        [total]
    );
    return result.rows[0];
};

// Actualizar una venta
const updateSale = async (id, total) => {
    const { rows } = await pool.query(
        'UPDATE sales SET total = $1 WHERE id = $2 RETURNING *',
        [total, id]
    );
    return rows[0];
};

// Eliminar una venta
const deleteSale = async (id) => {
    await pool.query('DELETE FROM sales WHERE id = $1', [id]);
};

module.exports = { getSales, getSaleById, createSale, updateSale, deleteSale };