const express = require('express');
const UserController = require('../controllers/userController'); // Importa el controlador
const router = express.Router();

router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUseradd);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;