
const { eventService } = require('../../services')

const getEventFunction = async (req, res, next) => {


    const result = {
        result: false,
        remarks: ''
    }
    let events = []
    try {
        events = await eventService.getEvents()

    } catch (err) {
        console.log(err)
    }

    if (events) {
        result.result = true
        result.data = events
    }
    res.status(200).send(result).end()
}

module.exports = getEventFunction