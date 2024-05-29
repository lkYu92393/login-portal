const firestore = require('../../../../lib/firestore')

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

    const data = account.data()
    delete lastUpdate

    return {
        id: account.id,
        ...data,
        lastLogin: data.lastLogin.toDate().valueOf(),
    }
}

module.exports = { getAccountByParameter }