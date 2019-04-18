const express = require('express');
const router = express.Router();
const registerMiddleWare = require('../middleware/register');

router.get('/:role', registerMiddleWare.getRegister);

module.exports = router;