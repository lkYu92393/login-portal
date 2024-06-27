var express = require('express');
const loginFunction = require('./login')
const verifyFunction = require('./verify')

const { checkSessionToken } = require('lib/authMiddleware')

var router = express.Router();

/* GET home page. */
router.post('/login', loginFunction);
router.post('/verify', verifyFunction);

router.get('/logout', () => {

})

module.exports = router;
