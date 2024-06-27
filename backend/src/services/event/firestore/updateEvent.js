const firestore = require('lib/firestore')

const updateEvent = async (id, data) => {
    data.lastUpdatedTime = new Date()

    const eventsDocument = await firestore
    .collection("garageEvents")
    .doc(id)
    .update(data)

    return eventsDocument
}

module.exports = { updateEvent }