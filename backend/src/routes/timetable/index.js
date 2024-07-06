var express = require('express');
var getEventFunction = require('./getEvent')
var addEventFunction = require('./addEvent')
var changeEventFunction = require('./changeEvent')
var removeEventFunction = require('./removeEvent')

const { checkSessionToken } = require('lib/authMiddleware')

var router = express.Router();

router.use(checkSessionToken)

/* GET home page. */
router.post('/getevent', getEventFunction);
router.post('/addevent', addEventFunction);
router.post('/changeevent', changeEventFunction);
router.post('/removeevent', removeEventFunction);


module.exports = router;
