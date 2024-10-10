// Importamos el modelo de productos y la biblioteca ExcelJS para manipular archivos Excel
const productModel = require('../models/productModel');
const fs = require('fs');

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        // Llamamos al modelo para obtener todos los productos
        const products = await productModel.getAllProducts();
        // Enviamos la lista de productos en formato JSON
        res.json(products);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
};

// Obtener un producto por su ID
const getProductById = async (req, res) => {
    try {
        // Llamamos al modelo para obtener un producto por su ID
        const product = await productModel.getProductById(req.params.id);
        if (product) {
            // Si el producto existe, lo enviamos en formato JSON
            res.json(product);
        } else {
            // Si el producto no existe, devolvemos un mensaje de error con código 404
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (err) {
        // En caso de error, devolvemos un mensaje de error con código 500
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        // Llamamos al modelo para crear un nuevo producto con los datos del cuerpo de la solicitud
        const newProduct = await productModel.createProduct(req.body);
        // Si el producto se crea con éxito, devolvemos el nuevo producto con código 201
        res.status(201).json(newProduct);
    } catch (err) {
        // En caso de error, devolvemos un mensaje de error con código 500
        res.status(500).json({ message: err.message });
    }
};

// Actualizar un producto existente
const updateProduct = async (req, res) => {
    try {
        // Llamamos al modelo para actualizar el producto con el ID y los nuevos datos del cuerpo de la solicitud
        const updatedProduct = await productModel.updateProduct(req.params.id, req.body);
        if (updatedProduct) {
            // Si el producto se actualiza correctamente, lo enviamos en formato JSON
            res.json(updatedProduct);
        } else {
            // Si el producto no se encuentra, devolvemos un mensaje de error con código 404
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (err) {
        // En caso de error, devolvemos un mensaje de error con código 500
        res.status(500).json({ message: err.message });
    }
};

// Eliminar un producto por su ID
const deleteProduct = async (req, res) => {
    try {
        // Llamamos al modelo para eliminar el producto con el ID proporcionado
        const deletedProduct = await productModel.deleteProduct(req.params.id);
        if (deletedProduct) {
            // Si el producto se elimina correctamente, enviamos un mensaje de confirmación
            res.json({ message: 'Producto eliminado' });
        } else {
            // Si el producto no se encuentra, devolvemos un mensaje de error con código 404
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (err) {
        // En caso de error, devolvemos un mensaje de error con código 500
        res.status(500).json({ message: err.message });
    }
};

// Buscar productos por una consulta en todos los campos
const searchProducts = async (req, res) => {
    try {
        // Llamamos al modelo para buscar productos basados en una consulta
        const products = await productModel.searchProducts(req.params.query);
        // Enviamos los productos encontrados en formato JSON
        res.json(products);
    } catch (err) {
        // En caso de error, devolvemos un mensaje de error con código 500
        res.status(500).json({ message: err.message });
    }
};

// Exportar productos a un archivo Excel
const exportProductsToExcel = async (req, res) => {
    try {
        // Obtener todos los productos para exportar
        const products = await productModel.getAllProducts();

        // Crear un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Productos');

        // Definir las columnas
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Nombre', key: 'name', width: 30 },
            { header: 'Descripción', key: 'description', width: 30 },
            { header: 'Precio', key: 'price', width: 10 },
            { header: 'Stock', key: 'stock', width: 10 },
        ];

        // Agregar filas con los productos
        products.forEach(product => {
            worksheet.addRow(product);
        });

        // Definir la ruta para guardar el archivo Excel temporalmente
        const filePath = './productos.xlsx';

        // Guardar el archivo Excel
        await workbook.xlsx.writeFile(filePath);

        // Configurar las cabeceras de la respuesta para la descarga del archivo
        res.setHeader('Content-Disposition', 'attachment; filename=productos.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Crear un stream del archivo y enviarlo como respuesta
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        // Borrar el archivo temporal después de enviarlo
        fileStream.on('end', () => {
            fs.unlinkSync(filePath);
        });
    } catch (err) {
        // En caso de error, devolvemos un mensaje de error con código 500
        res.status(500).json({ message: err.message });
    }
};

// Exportamos todas las funciones del controlador para su uso en rutas
module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    exportProductsToExcel,
};
