
const { accountService } = require('../../services')

const userinfoFunction = async (req, res, next) => {

    const result = {
        result: false,
        remarks: ''
    }
    let account = null
    if (req.user.sessionToken) {
        try {
            account = await accountService.getAccountByToken(req.user.sessionToken)
            if (account) {
                result.result = true
    
                delete account.password
                delete account.lastLogin
                delete account.lastUpdate
                delete account.sessionToken
                delete account.id
                result.data = account
            }

        } catch (err) {
            console.log(err)
        }
    }
    return res.status(200).send(result).end()
}

module.exports = userinfoFunction