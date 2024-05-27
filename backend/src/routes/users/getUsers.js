
const { accountService } = require('../../services')

const getUsersFunction = async (req, res, next) => {

    const result = {
        result: false,
        remarks: ''
    }
    try {
        const accountsSnapshot = await accountService.getAccounts()

        result.result = true
        result.data = accountsSnapshot
    } catch (err) {
        console.log(err)
    }
    res.status(200).send(result).end()
}

module.exports = getUsersFunction