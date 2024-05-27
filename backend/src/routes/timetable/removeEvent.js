
const { eventService } = require('../../services')

const removeEventFunction = async (req, res, next) => {
    const result = {
        result: false,
        remarks: ''
    }
    try {
        if (req.user.role === 100) {
            await eventService.removeEvent(req.body.id)

            result.result = true
        }
    } catch (err) {
        console.log(err)
    }
    res.status(200).send(result).end()
}

module.exports = removeEventFunction