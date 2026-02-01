const express = require('express');
const router = express.Router();
const DailyLog = require('../models/DailyLog');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const logs = await DailyLog.find({ userId: req.user.id });
    const dates = logs.map(log => log.date);
    res.json(dates);
  } catch (err) {
    console.log('GET daily-log error:', err);
    res.status(500).json({ message: 'Failed to fetch logs' });
  }
});

router.get('/:date', auth, async (req, res) => {
  try {
    const log = await DailyLog.findOne({
      date: req.params.date,
      userId: req.user.id
    });

    if (!log) {
      return res.status(404).json({ message: 'No log found' });
    }

    res.json(log);
  } catch (err) {
    console.log('GET daily-log/:date error:', err);
    res.status(500).json({ message: 'Failed to fetch log' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { date, day, learned, technical, tomorrow, color } = req.body;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const log = await DailyLog.findOneAndUpdate(
      { date, userId: req.user.id },
      { date, day, learned, technical, tomorrow, color, userId: req.user.id },
      { upsert: true, new: true }
    );

    res.status(201).json(log);
  } catch (err) {
    console.log('POST daily-log error:', err);
    res.status(500).json({ message: err.message || 'Error saving data' });
  }
});

module.exports = router;