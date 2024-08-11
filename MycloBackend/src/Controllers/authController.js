const User = require('../Models/authUserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserProfile = require('../Models/userProfile');

dotenv.config();

const registerUser = async (req, res) => {
  const { fullName, dob, email, address, contactNumber, role, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      fullName,
      dob,
      email,
      address,
      contactNumber,
      role,
      password,
    });

    await user.save(); // User ID created after registration

    // Create profile for new user
    const newProfile = new UserProfile({ user: user.id });
    await newProfile.save();

    // If you want to redirect to dashboard after registration
    // const payload = {
    //   user: {
    //     id: user.id,
    //   },
    // };
    
    // jwt.sign(
    //   payload,
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1h' },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ msg: "User Registered successfully", token, user: user });
    //   }
    // );

    res.status(201).json({
      msg: "User registered successfully",
      user: user,
      userProfile: newProfile,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role, // Include the role in the payload
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: "User Logged-In successfully",
          token: `Bearer ${token}`,
          userDetails: user,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


module.exports = {
  registerUser,
  loginUser,
};
