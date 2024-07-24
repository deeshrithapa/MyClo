const Fabric = require('../Models/fabrics');

const createFabric = async (req, res) => {
    const { name, type, pricePerYard } = req.body;

    const addFabric = new Fabric({
        name,
        type,
        pricePerYard
    });

    try {
        const response = await addFabric.save();
        if (response) {
            res.status(201).json({ message: "Fabric created successfully", response });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", err });
    }
};

module.exports = createFabric;
