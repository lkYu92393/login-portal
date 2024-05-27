
const { accountService } = require('../../services')

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
                const id = account.id

                // update login time
                await accountService.updateAccount(id, {
                    isDeleted: 1,
                    lastUpdate: new Date(),
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    return res.status(200).send(result).end()
}

module.exports = deleteUserFunction