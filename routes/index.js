const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.post('/add', productController.addProduct);
router.get('/edit/:id', productController.getEditProduct);
router.post('/edit', productController.postEditProduct);
router.post('/delete', productController.deleteProduct);

module.exports = router;