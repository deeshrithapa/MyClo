const Order = require('../Models/order');
const OrderItem = require('../Models/orderItem');

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  res.status(500).json({ msg: error.message });
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items');
    res.status(200).json({ orders });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get an order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user').populate('items');
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { user, status, totalPrice, items } = req.body;
    const order = new Order({ user, status, totalPrice, items });
    await order.save();
    res.status(201).json({ order });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update an order by ID
const updateOrder = async (req, res) => {
  try {
    const { status, totalPrice, items } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, totalPrice, items },
      { new: true, runValidators: true }
    ).populate('user').populate('items');
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.status(200).json({ msg: "Order deleted successfully" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
