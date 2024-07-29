const User = require('../Models/authUserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserProfile = require('../Models/userprofileModel');

dotenv.config();

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const newProfile = new UserProfile({ user: user._id });
    await newProfile.save();

    res.status(201).json({
      msg: "User registered successfully",
      user: user,
      userProfile: newProfile,
    });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).send('Server error');
  }
};


  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      let user = await User.findOne({ email });
  
      if (!user) {
        console.log('User not found');
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch);
  
      if (!isMatch) {
        console.log('Password does not match');
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            console.error('JWT error:', err);
            return res.status(500).json({ msg: 'Server error' });
          }
          res.json({ msg: "User Logged-In successfully", token, userDetails: user });
        }
      );
    } catch (err) {
      console.error('Server error:', err.message);
      res.status(500).send('Server error');
    }
  };
  
  

module.exports = {
  registerUser,
  loginUser,
};
