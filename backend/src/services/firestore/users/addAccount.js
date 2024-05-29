const firestore = require('../../../lib/firestore')

const addAccount = async (data) => {
    try {
        data.isDeleted = 0
        data.lastUpdate = new Date()
        await firestore.collection('users').add(data)
        return true
    } catch (err) {
        console.log(err)
    }
    return false
}

module.exports = { addAccount }