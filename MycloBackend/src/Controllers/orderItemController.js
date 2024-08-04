const OrderItem = require('../Models/orderItem');

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  res.status(500).json({ msg: error.message });
};

// Get all order items
const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find().populate('order').populate('product');
    res.status(200).json({ orderItems });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get an order item by ID
const getOrderItemById = async (req, res) => {
  try {
    const orderItem = await OrderItem.findById(req.params.id).populate('order').populate('product');
    if (!orderItem) {
      return res.status(404).json({ msg: "Order item not found" });
    }
    res.status(200).json({ orderItem });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Create a new order item
const createOrderItem = async (req, res) => {
  try {
    const { order, product, quantity, price } = req.body;
    const orderItem = new OrderItem({ order, product, quantity, price });
    await orderItem.save();
    res.status(201).json({ orderItem });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update an order item by ID
const updateOrderItem = async (req, res) => {
  try {
    const { quantity, price } = req.body;
    const orderItem = await OrderItem.findByIdAndUpdate(
      req.params.id,
      { quantity, price },
      { new: true, runValidators: true }
    ).populate('order').populate('product');
    if (!orderItem) {
      return res.status(404).json({ msg: "Order item not found" });
    }
    res.status(200).json({ orderItem });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete an order item by ID
const deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByIdAndDelete(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ msg: "Order item not found" });
    }
    res.status(200).json({ msg: "Order item deleted successfully" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
