// ============================================
// server.js — Backend for Portfolio Website
// Run this with: npm start
// ============================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// ---- Middleware ----
app.use(cors());
app.use(express.json());

// Serve the frontend (index.html and static files)
app.use(express.static(path.join(__dirname, 'public')));

// ---- Connect to MongoDB ----
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection failed:', err.message));

// ---- Database Schema: Contact Messages ----
const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  subject: { type: String, default: 'No subject' },
  message: { type: String, required: true },
  date:    { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// ---- API Routes ----

// POST /api/contact — Save a contact form message
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    const newMessage = new Contact({ name, email, subject, message });
    await newMessage.save();

    console.log(`📧 New message from ${name} (${email})`);
    res.json({ success: true, message: 'Message saved successfully!' });

  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ success: false, error: 'Server error. Try again.' });
  }
});

// GET /api/messages — View all contact messages (admin use)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve index.html for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---- Start Server ----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
