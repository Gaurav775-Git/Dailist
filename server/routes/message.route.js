const router = require('express').Router();
const messageController = require('../middleware/message.controllers');
const auth = require('../middleware/auth');

router.get('/:chatId', auth, messageController.getMessages);
router.post('/create', auth, messageController.createMessage);

module.exports = router;