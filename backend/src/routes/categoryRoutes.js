const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', categoryController.getCategories);
router.get('/featured', categoryController.getFeaturedCategories);
router.get('/:slug', categoryController.getCategoryBySlug);

// Protected routes (Admin)
router.post('/', auth, categoryController.createCategory);
router.put('/:id', auth, categoryController.updateCategory);
router.delete('/:id', auth, categoryController.deleteCategory router;