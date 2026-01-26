const mongoose = require('mongoose');

const DailyLogSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true
  },
  day: String,
  learned: String,
  technical: String,
  tomorrow: String
}, { timestamps: true });

module.exports = mongoose.model('DailyLog', DailyLogSchema);
