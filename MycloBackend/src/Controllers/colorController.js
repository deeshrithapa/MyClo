const Color = require('../Models/color');

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  res.status(500).json({ msg: error.message });
};

// Get all colors
const getAllColors = async (req, res) => {
  try {
    const colors = await Color.find();
    res.status(200).json({ colors });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get a color by ID
const getColorById = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) {
      return res.status(404).json({ msg: "Color not found" });
    }
    res.status(200).json({ color });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Create a new color
const createColor = async (req, res) => {
  try {
    const { name, hexCode } = req.body;
    const color = new Color({ name, hexCode });
    await color.save();
    res.status(201).json({ color });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update a color by ID
const updateColor = async (req, res) => {
  try {
    const { name, hexCode } = req.body;
    const color = await Color.findByIdAndUpdate(
      req.params.id,
      { name, hexCode },
      { new: true, runValidators: true }
    );
    if (!color) {
      return res.status(404).json({ msg: "Color not found" });
    }
    res.status(200).json({ color });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete a color by ID
const deleteColor = async (req, res) => {
  try {
    const color = await Color.findByIdAndDelete(req.params.id);
    if (!color) {
      return res.status(404).json({ msg: "Color not found" });
    }
    res.status(200).json({ msg: "Color deleted successfully" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  getAllColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
};
