
const { eventService } = require('../../services')

const addEventFunction = async (req, res, next) => {
    const result = {
        result: false,
        remarks: ''
    }
    // do checking for req body

    try {
        if (req.user.role === 100) {
            // do collision check?
            // const eventsSnapshot = await firestore
            //     .collection("garageEvents")
            //     .where('location', '==', req.body.location)
            //     .get();

            const data = req.body
            data.start = new Date(data.start)
            data.end = new Date(data.end)
            data.username = req.user.username
            data.createdTime = new Date()
            data.lastUpdatedTime = new Date()

            const res = await eventService.addEvent(data)

            if (res.id) {
                result.result = true
                result.data = {
                    id: res.id
                }
            }
        }
    } catch (err) {
        console.log(err)
    }

    res.status(200).send(result).end()
}

module.exports = addEventFunction