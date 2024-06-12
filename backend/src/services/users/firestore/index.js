const { addAccount } = require('./addAccount')
const { getAccounts, getAccountByUsername, getAccountByToken } = require('./getAccount')
const { updateAccount } = require('./updateAccount')

module.exports = { addAccount, getAccounts, getAccountByUsername, getAccountByToken, updateAccount }