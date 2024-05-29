
const { accountService } = require('../../services')

const verifyFunction = async (req, res, next) => {

    const result = {
        result: false,
        remarks: ''
    }
    let account = null
    if (req.body.token) {
        try {
            account = await accountService.getAccountByToken(req.body.token)

            result.result = account && ((account.lastLogin.toDate().valueOf() + 72 * 60 * 60 * 1000) > new Date().valueOf())

            if (result.result) {
                // update login time
                await accountService.updateAccount(account.id, {
                    lastLogin: new Date(),
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    return res.status(200).send(result).end()
}

module.exports = verifyFunction