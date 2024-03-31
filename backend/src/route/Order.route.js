const express = require('express');
const orderController = require('../controller/Order.controller');
const { authenticateToken } = require('../middleware/AuthJWT.middlware');

const router = express.Router();

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.post('/', orderController.createOrder);
// router.delete('/:id', orderController.createOrder);

module.exports = router;
