//This file knows that the request is for v1 or v2 or any other version
const express = require('express');
const router = express.Router();
router.use('/v1',require('./v1'))
module.exports = router;