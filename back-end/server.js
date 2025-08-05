const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const videoRoutes = require('./routes/video');
const authRoutes = require('./routes/auth');  // import auth routes

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (no deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Sample root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use API routes
app.use('/api/videos', videoRoutes);
app.use('/api/auth', authRoutes);  // add auth routes here

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
