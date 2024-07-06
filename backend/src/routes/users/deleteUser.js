
const { accountService } = require('services')

const deleteUserFunction = async (req, res, next) => {
    const result = {
        result: false,
        remarks: ''
    }
    let account = null
    if (req.body.username) {
        try {
            account = await accountService.getAccountByUsername(req.body.username)

            if (account) {
                result.result = true
                // update login time
                await accountService.updateAccount(account.id, {
                    isDeleted: 1,
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    return res.status(200).send(result).end()
}

module.exports = deleteUserFunction