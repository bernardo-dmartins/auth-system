const db = require('../config/db');

const User = {};

User.create = (username, email, hashedPassword, callback) => {
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, hashedPassword], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results.insertId);
  });
};

User.findByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results[0]);
  });
};

module.exports = User;
