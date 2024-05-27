
const { getCharArray } = require('../../lib/utility')
const { createHash } = require('crypto')

const { accountService } = require('../../services')

const loginFunction = async (req, res, next) => {
    const result = {
        result: false,
        remarks: ''
    }
    let account = null
    if (req.body.username && req.body.password) {
        account = await accountService.getAccountByUsername(req.body.username)

        if (account.length === 0) {
            result.remarks = "Account not exists."
        } else {
            // check password
            const id = account.id
            const accountData = account.data()

            const userPassword = createHash('sha256').update(req.body.password).digest('hex')
    
            if (accountData.password !== userPassword) {
                result.remarks = "Wrong password"
            } else {
                result.result = true
                result.data = {
                    username: accountData.username,
                    token: getCharArray(),
                    role: accountData.role
                }
    
                // update login time
                await accountService.updateAccount(id, {
                    lastLogin: new Date(),
                    sessionToken: result.data.token
                })
            }
        }
    }
    return res.status(200).send(result)
}

module.exports = loginFunction