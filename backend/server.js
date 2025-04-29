// import modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();  // Load env vars first
const sequelize = require('./config/database');

// Import your route files
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/aiblurb')

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/aiblurb', aiRoutes)

// test db connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database error:', err);
    process.exit(1);
  });
