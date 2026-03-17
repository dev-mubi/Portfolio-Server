const express = require('express');
const router = express.Router();
const { About } = require('../models');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/about
// @desc    Get the singleton about entry
// @access  Public
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne();

    res.json({
      success: true,
      data: about || {}
    });
  } catch (error) {
    console.error('Get about error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/admin/about
// @desc    Update the singleton about entry
// @access  Private
router.put('/', authMiddleware, async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = await About.create(req.body);
    } else {
      await about.update(req.body);
    }

    res.json({
      success: true,
      message: 'About configuration updated successfully',
      data: about
    });
  } catch (error) {
    console.error('Update about error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
