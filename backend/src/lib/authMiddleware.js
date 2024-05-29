const { accountService } = require('../services')

const checkSessionToken = async (req, res, next) => {
    if (req.url.indexOf("login") > -1 || req.url.indexOf("verify") > -1) {
        return next()
    }

    const sessionToken = req.headers.authtoken || ''

    const account = await accountService.getAccountByToken(sessionToken)

    if (account) {
        req.user = account
        return next()
    } else {
        return res.status(403).end()
    }
}

module.exports = { checkSessionToken }