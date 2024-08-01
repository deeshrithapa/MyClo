const User = require('../Models/authUserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserProfile = require('../Models/userProfile')

dotenv.config();

const registerUser = async (req, res) => {
  const { name, email,role, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      role,
      password,
    });
    
    await user.save(); //user id cretaed after registration

    //Create profile for new user
    const newProfile = new UserProfile({user:user.id});
    await newProfile.save();


    //do this if you want to redirect to dashboard after registration
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
    //     res.json({ msg:"User Registered suceffully", token, user:user });
    //   }
    // );

    res.status(201).json({
      msg: "User registered sucessfully",
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
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({msg:"User Logged-In sucessfully", token, userDetails:user });
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