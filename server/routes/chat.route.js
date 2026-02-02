const router = require('express').Router();
const chatController = require('../middleware/chat.controllers');
const auth = require('../middleware/auth');

router.get('/', auth, chatController.getChats);
router.get('/users', auth, chatController.getUsersForChat);
router.post('/create', auth, chatController.createChat);

module.exports = router;