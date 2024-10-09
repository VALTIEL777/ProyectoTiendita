const pool = require('../config/config');

// Obtener los detalles de una venta por el ID de la venta
const getSaleDetailsBySaleId = async (saleId) => {
    const { rows } = await pool.query('SELECT * FROM sale_details WHERE sale_id = $1', [saleId]);
    return rows;
};

// Crear un nuevo detalle de venta
const createSaleDetail = async (saleId, productName, quantity, price) => {
    const result = await pool.query(
        'INSERT INTO sale_details (sale_id, product_name, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
        [saleId, productName, quantity, price]
    );
    return result.rows[0];
};


//agregar modulos exportados
module.exports = { getSaleDetailsBySaleId, createSaleDetail, deleteSaleDetail };


