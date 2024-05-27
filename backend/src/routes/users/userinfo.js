
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
                const accountData = account.data()
    
                delete accountData.password
                delete accountData.lastLogin
                delete accountData.lastUpdate
                delete accountData.sessionToken
                result.data = accountData
            }

        } catch (err) {
            console.log(err)
        }
    }
    return res.status(200).send(result).end()
}

module.exports = userinfoFunction