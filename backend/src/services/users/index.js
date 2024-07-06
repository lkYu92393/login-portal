const config = require('config')

const accountService = config.db === 'sqlite' ? require('./sqlite') : require('./firestore')

module.exports = { accountService }