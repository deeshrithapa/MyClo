const Size = require('../Models/size');

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  res.status(500).json({ msg: error.message });
};

// Create a new size
const createSize = async (req, res) => {
  try {
    const { name, description } = req.body;
    const size = new Size({ name, description });
    await size.save();
    res.status(201).json({ size });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get all sizes
const getAllSizes = async (req, res) => {
  try {
    const sizes = await Size.find();
    res.status(200).json({ sizes });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get size by ID
const getSizeById = async (req, res) => {
  try {
    const size = await Size.findById(req.params.id);
    if (!size) {
      return res.status(404).json({ msg: "Size not found" });
    }
    res.status(200).json({ size });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update size by ID
const updateSize = async (req, res) => {
  try {
    const { name, description } = req.body;
    const size = await Size.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!size) {
      return res.status(404).json({ msg: "Size not found" });
    }
    res.status(200).json({ size });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete size by ID
const deleteSize = async (req, res) => {
  try {
    const size = await Size.findByIdAndDelete(req.params.id);
    if (!size) {
      return res.status(404).json({ msg: "Size not found" });
    }
    res.status(200).json({ msg: "Size deleted successfully" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  createSize,
  getAllSizes,
  getSizeById,
  updateSize,
  deleteSize,
};
