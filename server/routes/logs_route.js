const express = require('express');
const router = express.Router();
const DailyLog = require('../models/DailyLog');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    console.log('Fetching daily logs for userId:', req.user.id); // Add this line
    const logs = await DailyLog.find({ userId: req.user.id });
    console.log('Retrieved logs:', logs); // Add this line
    const dates = logs.map(log => log.date);
    res.json(dates);
  } catch (err) {
    console.log('GET daily-log error:', err);
    res.status(500).json({ message: 'Failed to fetch logs' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { date, day, learned, technical, tomorrow } = req.body;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const log = await DailyLog.findOneAndUpdate(
      { date, userId: req.user.id },
      { date, day, learned, technical, tomorrow, userId: req.user.id },
      { upsert: true, new: true }
    );

    res.status(201).json(log);
  } catch (err) {
    console.log('POST daily-log error:', err);
    res.status(500).json({ message: err.message || 'Error saving data' });
  }
});

module.exports = router;
