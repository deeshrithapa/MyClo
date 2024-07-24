const Order = require('../Models/orders');

const createOrder = async (req, res) => {
    const { user, products, status } = req.body;

    const addOrder = new Order({
        user,
        products,
        status
    });

    try {
        const response = await addOrder.save();
        if (response) {
            res.status(201).json({ message: "Order created successfully", response });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", err });
    }
};

module.exports = createOrder;
