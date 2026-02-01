const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users_account",
        required: true
      }
    ],
    isGroup: {
      type: Boolean,
      default: false
    },
    groupName: {
      type: String
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
