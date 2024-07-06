const firestore = require('lib/firestore')

const getEvents = async () => {
    
    let events = null
    const eventsSnapshot = await firestore
    .collection("garageEvents")
    .get();

    if (eventsSnapshot.docs.length >= 1) {
        events = eventsSnapshot.docs.map(obj => {
            const tempData = obj.data()
            return {
                ...obj.data(),
                id: obj.id,
                start: tempData.start.toDate(),
                end: tempData.end.toDate()
            }
        })
    }

    return events
}

module.exports = { getEvents }