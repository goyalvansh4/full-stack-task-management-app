const Order = require('../../Models/order.model');

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
    const order = await Order.create(req.body);
    res.status(201).json({status:"success",message:"Order created successfully", order});
  }
  catch (error) {
    res.status(500).json({message:error.message});
  }
}

module.exports = { getOrders, createOrder };