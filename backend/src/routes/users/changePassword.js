
const { accountService } = require('../../services')
const utility = require('../../lib/utility')

const changePasswordFunction = async (req, res, next) => {

    const result = {
        result: false,
        remarks: ''
    }
    let account = null
    if (req.body.password) {
        try {
            account = await accountService.getAccountByUsername(req.body.username)

            if (account) {
                const userPassword = utility.getSHA256HashPassword(req.body.password)

                const id = account.id

                // update login time
                await accountService.updateAccount(id, {
                    password: userPassword,
                    lastUpdate: new Date()
                })

                result.result = true
            }
        } catch (err) {
            console.log(err)
        }
    }
    return res.status(200).send(result).end()
}

module.exports = changePasswordFunction