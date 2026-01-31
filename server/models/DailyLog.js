const mongoose = require('mongoose');

const DailyLogSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  day: String,
  learned: String,
  technical: String,
  tomorrow: String
}, { timestamps: true });

DailyLogSchema.index({ date: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('DailyLog', DailyLogSchema);
