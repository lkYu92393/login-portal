const firestore = require('../../../lib/firestore')

const addAccount = async (data) => {
    try {
        await firestore.collection('users').add(data)
        return true
    } catch (err) {
        console.log(err)
    }
    return false
}

module.exports = { addAccount }