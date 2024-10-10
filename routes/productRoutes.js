const express = require('express');

// Importa el controlador de productos que maneja la lógica de negocio
const ProductController = require('../controllers/productController');

// Crea un enrutador de express
const router = express.Router();

// Define las rutas y asigna los métodos del controlador a cada ruta
// Obtiene todos los productos
router.get('/products', ProductController.getAllProducts);

// Obtiene los productos segun su id
router.get('/products', ProductController.getProdById);

// Crea un nuevo producto
router.post('/products', ProductController.createProduct);

// Actualiza un producto existente por ID
router.put('/products/:id', ProductController.updateProduct);

// Elimina un producto existente por ID
router.delete('/products/:id', ProductController.deleteProduct);

// Exporta el enrutador para que pueda ser utilizado en la configuración de la aplicación
module.exports = router;
