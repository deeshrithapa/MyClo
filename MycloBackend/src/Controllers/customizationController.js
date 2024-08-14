const Customization = require('../Models/customizatoin');
const Product = require('../Models/products');
const User = require('../Models/authUserModel');

const createCustomization = async (req, res) => {
  const { productId, shoulderType, pockets, hem, vents } = req.body;
  const userId = req.user.id; // Assuming user ID is available from auth middleware

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const customization = new Customization({
      user: userId,
      product: productId,
      shoulderType,
      pockets,
      hem,
      vents,
    });

    await customization.save();
    res.status(201).json({ msg: 'Customization created successfully', customization });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};





module.exports = {
  createCustomization,
  
  
};
