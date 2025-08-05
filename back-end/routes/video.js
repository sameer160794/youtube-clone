const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// Get all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().populate('uploader', 'username');
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('uploader', 'username');
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
