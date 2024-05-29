const config = require('../config')

const services = config.db === 'sqlite' ? require('./sqlite') : require('./firestore')

module.exports = { ...services }