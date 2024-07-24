const Product = require('../Models/products');

const createProduct = async (req, res) => {
    const { name, category, price, description } = req.body;

    const addProduct = new Product({
        name,
        category,
        price,
        description
    });

    try {
        const response = await addProduct.save();
        if (response) {
            res.status(201).json({ message: "Product created successfully", response });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", err });
    }
};

module.exports = createProduct;
