const firestore = require('./firestore')

const checkSessionToken = async (req, res, next) => {
    if (req.url.indexOf("login") > -1 || req.url.indexOf("verify") > -1) {
        return next()
    }

    const sessionToken = req.headers.authtoken || ''

    const accountsSnapshot = await firestore
        .collection("users")
        .where('sessionToken', '==', sessionToken)
        .get();

    if (accountsSnapshot.docs.length > 0) {
        let data = accountsSnapshot.docs[0].data()
        req.user = {
            id: data.id,
            username: data.username,
            role: data.role,
            sessionToken: data.sessionToken,
        }
        return next()
    } else {
        res.status(403).end()
    }
}

module.exports = { checkSessionToken }