
const { eventService } = require('../../services')

const changeEventFunction = async (req, res, next) => {
    const result = {
        result: false,
        remarks: ''
    }
    try {
        if (req.user.role === 100) {
            await eventService.updateEvent(req.body.id, {
                title: req.body.title,
                start: new Date(req.body.start),
                end: new Date(req.body.end),
                location: req.body.location,
                type: req.body.type,
                remarks: req.body.remarks
            })

            result.result = true
        }
    } catch (err) {
        console.log(err)
    }

    res.status(200).send(result).end()
}

module.exports = changeEventFunction