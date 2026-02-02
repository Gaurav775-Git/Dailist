const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'users_account',
        required: true
    },
    text: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);