const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const config = require('./config/database'); // Import database configuration

const voucherRoutes = require('./routes/voucherRoutes');
const userRoutes = require('./routes/userRoutes'); // Optional for user management

const app = express();

// Connect to MongoDB
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', voucherRoutes);
app.use('/', userRoutes); // Optional for user management

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
