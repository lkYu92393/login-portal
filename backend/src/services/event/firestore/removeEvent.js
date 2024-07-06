const firestore = require('lib/firestore')

const removeEvent = async (id) => {
    await firestore
                .collection("garageEvents")
                .doc(id).delete()
}

module.exports = { removeEvent }