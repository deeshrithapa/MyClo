const Category = require('../Models/categories');

const createCategory = async (req, res) => {
    const { name, description } = req.body;

    const addCategory = new Category({
        name,
        description
    });

    try {
        const response = await addCategory.save();
        if (response) {
            res.status(201).json({ message: "Category created successfully", response });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", err });
    }
};

module.exports = createCategory;
