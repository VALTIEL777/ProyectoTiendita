const product = require('../models/productModel');

class ProductController {
    
    // Método para obtener todos los productos
    static async getAllProducts(req, res) {
        try {
            // Busca todos los productos en la base de datos
            const products = await Product.findAll();
            // Responde con los productos en formato JSON
            res.json(products);
        } catch (e) {
            // Manejo de errores, responde con un error 500
            res.status(500).json({ error: e.message });
        }
    }

    static async getProdById(req, res)
    {
        try{
            const user = await Product.findById(req.params.id);
            if(!user)
            {
                return res.status(404).json({message:"User not found"});
            }
            return res.json(user);
        }catch(error)
        {
            res.status(500).json({error: error.message});
        }
    }

    // Método para crear un nuevo producto
    static async createProduct(req, res) {
        try {
            // Crea un nuevo producto con los datos enviados en el cuerpo de la solicitud
            const product = await Product.create(req.body);
            // Responde con el producto creado y un código 201 (creado)
            res.status(201).json(product);
        } catch (e) {
            // Manejo de errores, responde con un error 500
            res.status(500).json({ error: e.message });
        }
    }

    // Método para actualizar un producto existente
    static async updateProduct(req, res) {
        try {
            // Actualiza el producto con el id pasado como parámetro y los datos del cuerpo
            const product = await Product.update(req.params.id, req.body);
            // Si no se encuentra el producto, responde con un 404
            if (!product) {
                return res.status(404).json({ message: "Product not found!" });
            }
            // Responde con el producto actualizado
            return res.json(product);
        } catch (e) {
            // Manejo de errores, responde con un error 500
            res.status(500).json({ error: e.message });
        }
    }

    // Método para eliminar un producto
    static async deleteProduct(req, res) {
        try {
            // Elimina el producto por id
            const product = await Product.delete(req.params.id);
            // Si no se encuentra el producto, responde con un 404
            if (!product) {
                return res.status(404).json({ message: "Product not found!" });
            }
            // Responde con un mensaje de éxito
            return res.json({ message: "Product deleted!" });
        } catch (e) {
            // Manejo de errores, responde con un error 500
            res.status(500).json({ error: e.message });
        }
    }

    // Método para buscar productos por un término de búsqueda
    static async searchProduct(req, res) {
        try {
            // Busca productos por un término (parámetro de la URL)
            const product = await Product.search(req.params.term);
            // Si no se encuentran productos, responde con un 404
            if (!product) {
                return res.status(404).json({ message: "No products found!" });
            }
            // Responde con los productos encontrados
            return res.json(product);
        } catch (e) {
            // Manejo de errores, responde con un error 500
            res.status(500).json({ error: e.message });
        }
    }
}

// Exporta el controlador para que pueda ser utilizado en las rutas de la aplicación
module.exports = ProductController;