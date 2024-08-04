const Product = require("../Models/products");
const domain = "http://localhost:5000";

const sendErrorResponse = (res, error) => {
    res.status(500).json({ msg: error.message });
  };
const createProduct = async (req, res) => {
  const { name, price, description,productImage} = req.body;

  const newProduct = new Product({
    name: name,   
    price: price,
    description: description,
    // stock: stock,  
    productImage: productImage
  });

  try {
    const response = await newProduct.save();
    if (response) {
      res.status(201).json({ message: "Product added successfully.", response });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error });
  }
};



const updateProduct = async (req, res) => {
  try {
    const {name,price,description,} = req.body;
    let updateData = {
      name: name,
    
      price: price,
      description: description,
    };

    if (req.file) {
      const productImage = `${domain}/uploads/products/${req.file.filename}`;
      updateData.productImage = productImage;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({
      msg: "Product updated successfully",
      product: product,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = { createProduct, updateProduct };