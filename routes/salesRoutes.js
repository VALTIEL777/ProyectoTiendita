const express = require('express');
const salesController = require('../controllers/salesController');
const router = express.Router();

router.get('/ventas', salesController.getAllSales);
router.get('/:id', salesController.getSale);
router.post('/ventas', salesController.createSale);
router.put('/:id', salesController.updateSale);
router.delete('/:id', salesController.deleteSale);

module.exports = router;    
