const mongoose= require("mongoose")
const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },

  category: {
    type: String,
    enum: ["health", "learning", "work", "personal","other"],
  },

  points: { type: Number, required: true },

  completed: { type: Boolean, default: false },

  completedAt: { type: Date },

}, { timestamps: true });

const dailytaskschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_account",
    required: true,
  },

  date: { type: Date, required: true },

  tasks: [taskSchema],

}, { timestamps: true });


module.exports = mongoose.model("user_daily_task",dailytaskschema)