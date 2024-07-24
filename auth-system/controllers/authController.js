const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const authController = {};

authController.register = (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send('Error hashing password.');
    }
    User.create(username, email, hashedPassword, (err, userId) => {
      if (err) {
        return res.status(500).send('Error registering user.');
      }
      res.status(201).send({ userId });
    });
  });
};

authController.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, user) => {
    if (err || !user) {
      return res.status(401).send('Invalid email or password.');
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).send('Invalid email or password.');
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).send({ token });
    });
  });
};

module.exports = authController;
