const accountService = require('./users')
const eventService = require('./event')
const { initDb } = require('./db')

initDb()

module.exports = { accountService, eventService }