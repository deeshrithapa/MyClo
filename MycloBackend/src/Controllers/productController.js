const Product = require('../Models/products');
const domain = 'http://localhost:5000';

const sendErrorResponse = (res, error) => {
  res.status(500).json({ msg: error.message });
};

const createProduct = async (req, res) => {
  const { name, price, description, category } = req.body;
  const productImage = req.file ? `${domain}/uploads/products/${req.file.filename}` : null;

  const newProduct = new Product({
    name,
    price,
    description,
    productImage,
    category,  // Include the category field
  });

  try {
    const response = await newProduct.save();
    res.status(201).json({ message: 'Product added successfully.', response });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    let updateData = {
      name,
      price,
      description,
      category,  // Include the category field
    };

    if (req.file) {
      updateData.productImage = `${domain}/uploads/products/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.status(200).json({
      msg: 'Product updated successfully',
      product,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};


const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.status(200).json({ msg: 'Product deleted successfully' });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category'); // Populate category
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



module.exports = { createProduct, updateProduct, deleteProduct, getProductById, getAllProducts };
