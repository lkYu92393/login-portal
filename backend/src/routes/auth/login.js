
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

        if (!account || account.length === 0) {
            result.remarks = "Account not exists."
        } else {
            // check password
            const userPassword = createHash('sha256').update(req.body.password).digest('hex')
    
            if (account.password !== userPassword) {
                result.remarks = "Wrong password"
            } else {
                result.result = true
                result.data = {
                    username: account.username,
                    token: getCharArray(),
                    role: account.role
                }
    
                // update login time
                await accountService.updateAccount(account.id, {
                    lastLogin: new Date(),
                    sessionToken: result.data.token
                })
            }
        }
    }
    return res.status(200).send(result)
}

module.exports = loginFunction