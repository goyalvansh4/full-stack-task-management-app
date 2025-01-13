const express = require('express');
const { getOrders, createOrder } = require('../../Controller/Order Management/order.controller');
const router = express.Router();



router.get('/',getOrders);
router.post('/',createOrder);

module.exports = router;