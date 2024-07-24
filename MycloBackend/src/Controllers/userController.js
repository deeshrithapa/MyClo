const User = require('../Models/users');

const createUser = async (req, res) => {
    const { name, age, address, email, phone, role } = req.body;

    const addUser = new User({
        name,
        age,
        address,
        email,
        phone,
        role
    });

    try {
        const response = await addUser.save();
        if (response) {
            res.status(201).json({ message: "User created successfully", response });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", err });
    }
};

module.exports = createUser;
