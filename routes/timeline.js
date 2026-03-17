const express = require('express');
const router = express.Router();
const { Timeline } = require('../models');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/timeline
// @desc    Get all timeline entries ordered by sort_order
// @access  Public
router.get('/', async (req, res) => {
  try {
    const timeline = await Timeline.findAll({
      order: [['sort_order', 'ASC']]
    });

    res.json({
      success: true,
      data: timeline
    });
  } catch (error) {
    console.error('Get timeline error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/admin/timeline
// @desc    Create new timeline entry
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const entry = await Timeline.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Timeline entry created successfully',
      data: entry
    });
  } catch (error) {
    console.error('Create timeline error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/admin/timeline/:id
// @desc    Update timeline entry
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const entry = await Timeline.findByPk(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Timeline entry not found'
      });
    }

    await entry.update(req.body);

    res.json({
      success: true,
      message: 'Timeline entry updated successfully',
      data: entry
    });
  } catch (error) {
    console.error('Update timeline error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/admin/timeline/:id
// @desc    Delete timeline entry
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const entry = await Timeline.findByPk(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Timeline entry not found'
      });
    }

    await entry.destroy();

    res.json({
      success: true,
      message: 'Timeline entry deleted successfully'
    });
  } catch (error) {
    console.error('Delete timeline error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
