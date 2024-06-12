const config = require('../../config')

const eventService = config.db === 'sqlite' ? require('./sqlite') : require('./firestore')

module.exports = { eventService }