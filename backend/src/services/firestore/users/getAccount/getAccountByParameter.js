const firestore = require('../../../lib/firestore')

const getAccountByParameter = async (parameter, value) => {
    let account = null
    try {
        const accounts = await firestore
            .collection("users")
            .where(parameter, "==", value)
            .where("isDeleted", '==', 0)
            .get();

        if (accounts.docs.length >= 1) {
            account = accounts.docs[0]
        }
    } catch (err) {
        console.log(err)
    }
    return account
}

module.exports = { getAccountByParameter }