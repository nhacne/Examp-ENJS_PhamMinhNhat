// routes/index.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// READ: Tuyến đường chính hiển thị danh sách
router.get('/', productController.getProducts);

// CREATE: Tuyến đường thêm mục mới
router.post('/add', productController.addProduct);

// --- Mới: Tuyến đường hiển thị biểu mẫu chỉnh sửa ---
// Sử dụng tham số động ":id" để truyền ID mục cần chỉnh sửa
router.get('/edit/:id', productController.getEditProduct);

// --- Mới: Tuyến đường xử lý POST chỉnh sửa ---
router.post('/edit', productController.postEditProduct);

// DELETE: Tuyến đường xóa mục
router.post('/delete', productController.deleteProduct);

module.exports = router;