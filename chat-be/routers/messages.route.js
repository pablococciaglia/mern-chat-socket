const { Router } = require('express');
const { getChat } = require('../controllers/messages.controller');
const { validateToken } = require('../middlewares/validate-token');

const router = Router();

router.get('/:from', validateToken, getChat);

module.exports = router;
