const router = require('express').Router();
const chatController = require('../middleware/chat.controllers');
const auth = require('../middleware/auth');

router.post('/create', auth, chatController.createChat);

module.exports = router;