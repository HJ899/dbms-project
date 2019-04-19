const express = require('express');
const router = express.Router();
const registerMiddleWare = require('../middleware/register');

router.get('/', registerMiddleWare.getRegister);
router.get('/:role', registerMiddleWare.getRegisterWithRole);

module.exports = router;