const firestore = require('lib/firestore')

const getAccountByParameter = async (parameter, value) => {
    try {
        const accounts = await firestore
            .collection("users")
            .where(parameter, "==", value)
            .where("isDeleted", '==', 0)
            .get();

        if (accounts.docs.length >= 1) {
            account = accounts.docs[0]
        } else {
            return null
        }
    } catch (err) {
        console.log(err)
    }

    const data = account.data()
    delete lastUpdate
    try {
        if (data.lastLogin) {
            data.lastLogin = data.lastLogin.toDate().valueOf()
        }
    } catch (err) {
        console.log(err)
    }

    return {
        id: account.id,
        ...data
    }
}

module.exports = { getAccountByParameter }