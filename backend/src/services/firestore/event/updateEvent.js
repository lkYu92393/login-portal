const firestore = require('../../../lib/firestore')

const updateEvent = async (id, data) => {
    const eventsDocument = await firestore
    .collection("garageEvents")
    .doc(id)
    .update(data)

    return eventsDocument
}

module.exports = { updateEvent }