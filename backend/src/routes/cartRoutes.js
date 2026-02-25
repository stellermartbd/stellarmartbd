const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

// Public routes
router.get('/:sessionId', cartController.getCart);

// Protected routes
router.post('/add', auth, cartController.addToCart);
router.put('/update', auth, cartController.updateCartItem);
router.delete('/remove/:productId', auth, cartController.removeFromCart);
router.delete('/clear', auth, cartController.clearCart);

module.exports = router;