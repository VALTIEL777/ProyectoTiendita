const saleModel = require('../models/saleModel');
const saleDetailsModel = require('../models/saleDetailsModel');

// Obtener todas las ventas
const getAllSales = async (req, res) => {
    try {
        const sales = await saleModel.getSales();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener ventas' });
    }
};

// Obtener una venta por ID
const getSale = async (req, res) => {
    try {
        const sale = await salesModel.getSaleById(req.params.id);
        if (!sale) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la venta' });
    }
};

// Crear una nueva venta
const createSale = async (req, res) => {
    try {
        const { total, details } = req.body;
        const newSale = await saleModel.createSale(total);
        let detailsSaved = [];

        for (let element of details) {
            const det = await saleDetailsModel.createSaleDetail(newSale.id, element.product_name, element.quantity, element.price);
            detailsSaved.push(det);
        }


        res.status(201).json({ sale: newSale, detail: detailsSaved });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la venta' });
    }
};

// Actualizar una venta
const updateSale = async (req, res) => {
    try {
        const { total } = req.body;
        const updatedSale = await salesModel.updateSale(req.params.id, total);
        if (!updatedSale) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.status(200).json(updatedSale);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la venta' });
    }
};

// Eliminar una venta
const deleteSale = async (req, res) => {
    try {
        await salesModel.deleteSale(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la venta' });
    }
};

module.exports = { getAllSales, getSale, createSale, updateSale, deleteSale };
