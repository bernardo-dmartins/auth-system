const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./auth-system/routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4009;

app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

