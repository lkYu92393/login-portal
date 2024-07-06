var express = require('express');
const userinfoFunction = require('./userinfo')
const editUserFunction = require('./editUser')
const deleteUserFunction = require('./deleteUser')
const changePasswordFunction = require('./changePassword')
const getUsersFunction = require('./getUsers')

const { checkSessionToken } = require('lib/authMiddleware')

var router = express.Router();

router.use(checkSessionToken)

/* GET home page. */
router.post('/userinfo', userinfoFunction)
router.post('/edituser', editUserFunction)
router.post('/deleteuser', deleteUserFunction)
router.post('/changepassword', changePasswordFunction)
router.get('/getusers', getUsersFunction)

router.get('/logout', () => {

})

module.exports = router;
