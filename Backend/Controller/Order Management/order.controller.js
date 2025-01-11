const Order = require('../Models/order.model');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({status:"success",orders});
  }
  catch (error) {
    res.status(500).json({message:error.message});
  }
}

const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, status } = req.body;
    const order = await Order.create({userId, items, totalAmount, status});
    res.status(201).json({status:"success",message:"Order created successfully", order});
  }
  catch (error) {
    res.status(500).json({message:error.message});
  }
}

module.exports = { getOrders, createOrder };