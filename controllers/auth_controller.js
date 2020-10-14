const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');


// User registration
const registerUser = async (req, res) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      const message = error.array()
        .reduce((arr, { msg }) => {
          if (msg) {
            arr.push(msg)
          }
          return arr;
        }, []);

      return res.status(400).json({
        error: error.array(),
        message,
      });
    }

    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(400).json({ message: 'This user already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'User created' });

  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }

};

// User login to the system
const loginUser = async (req, res) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array(),
        message: 'Invalid login data',
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User is not found' });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return res.status(400).json({ message: 'Login and password do not match.' });
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    );

    res.json({ token, userId: user.id });

  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }

};

module.exports = {
  registerUser,
  loginUser
};
