const express = require('express');
const router = express.Router();
const indexMiddleWare = require('../middleware/index');

router.get('/', indexMiddleWare.getIndex);

module.exports = router;