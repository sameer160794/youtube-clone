const express = require('express');
const Video = require('../models/Video');
const router = express.Router();

// Get all videos (excluding comments)
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find()
      .populate('uploader', 'username')
      .select('-comments');
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single video including comments (with usernames)
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('uploader', 'username')
      .populate('comments.userId', 'username');

    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ New combined route: Increment views and return full video
router.get('/:id/viewed', async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('uploader', 'username')
      .populate('comments.userId', 'username');

    if (!video) return res.status(404).json({ message: 'Video not found' });

    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Error incrementing view', error: err.message });
  }
});

// ❌ REMOVE this route (no longer needed)
// router.put('/:id/view', ...)

// Like a video
router.post('/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    if (!video.likes.includes(userId)) {
      video.likes.push(userId);
      video.dislikes = video.dislikes.filter(id => id.toString() !== userId);
    } else {
      video.likes = video.likes.filter(id => id.toString() !== userId);
    }

    await video.save();
    const updatedVideo = await Video.findById(req.params.id).populate('uploader', 'username');
    res.json(updatedVideo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dislike a video
router.post('/:id/dislike', async (req, res) => {
  try {
    const { userId } = req.body;
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    if (!video.dislikes.includes(userId)) {
      video.dislikes.push(userId);
      video.likes = video.likes.filter(id => id.toString() !== userId);
    } else {
      video.dislikes = video.dislikes.filter(id => id.toString() !== userId);
    }

    await video.save();
    const updatedVideo = await Video.findById(req.params.id).populate('uploader', 'username');
    res.json(updatedVideo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post a comment
router.post('/:id/comment', async (req, res) => {
  try {
    const { userId, text } = req.body;
    if (!text || !userId) return res.status(400).json({ message: 'Missing userId or text' });

    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    video.comments.push({ userId, text });
    await video.save();

    const updatedComments = await Video.findById(req.params.id)
      .populate('comments.userId', 'username');

    res.json(updatedComments.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
