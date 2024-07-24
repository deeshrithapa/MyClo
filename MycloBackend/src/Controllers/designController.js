const Design = require('../Models/designs');

const createDesign = async (req, res) => {
    const { user, product, fabric, designDetails } = req.body;

    const addDesign = new Design({
        user,
        product,
        fabric,
        designDetails
    });

    try {
        const response = await addDesign.save();
        if (response) {
            res.status(201).json({ message: "Design created successfully", response });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", err });
    }
};

module.exports = createDesign;
