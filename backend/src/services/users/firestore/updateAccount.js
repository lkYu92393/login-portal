const firestore = require('lib/firestore')

const updateAccount = async (id, data) => {
    try {
        data.lastUpdate = new Date()
        await firestore.collection('users').doc(id).update(data)
        return true
    } catch (err) {
        console.log(err)
    }
    return false
}

module.exports = { updateAccount }