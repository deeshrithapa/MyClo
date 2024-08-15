const Contact = require('../Models/contact');
const User = require('../Models/authUserModel');

exports.createContactMessage = async (req, res) => {
  try {
    const { firstName, contactNumber, email, questions } = req.body;

    // Optional: Retrieve the user ID from the request (e.g., from authentication middleware)
    const userId = req.user ? req.user._id : null; // Assuming req.user is set by authentication middleware

    // Create a new contact message
    const newContactMessage = await Contact.create({
      user: userId,
      firstName,
      contactNumber,
      email,
      questions
    });

    res.status(201).json({
      success: true,
      data: newContactMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
