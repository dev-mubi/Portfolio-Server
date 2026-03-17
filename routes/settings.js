const express = require('express');
const router = express.Router();
const { Settings } = require('../models');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/settings
// @desc    Get the singleton settings entry
// @access  Public
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.findOne();

    res.json({
      success: true,
      data: settings || {}
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/admin/settings
// @desc    Update the singleton settings entry
// @access  Private
router.put('/', authMiddleware, async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      await settings.update(req.body);
    }

    res.json({
      success: true,
      message: 'Global settings updated successfully',
      data: settings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
