
const { accountService } = require('../../services')
const utility = require('../../lib/utility')

const editUserFunction = async (req, res, next) => {
    const result = {
        result: false,
        remarks: ''
    }
    let account = null
    if (req.body.action) {
        try {
            account = await accountService.getAccountByUsername(req.body.data.username)

            if (account && req.body.action === 'add') {
                result.remarks = 'Username existed. Fail to add.'
            } else {
                if (req.body.action === 'add') {
                    // Add
                    const userPassword = utility.getSHA256HashPassword("P@ssword!")
                    await accountService.addAccount({
                        ...req.body.data,
                        role: parseInt(req.body.data.role),
                        lastUpdate: new Date(),
                        password: userPassword,
                        isDeleted: 0
                    })
                    result.result = true
                } else {
                    // update login time
                    const id = account.id
                    await accountService.updateAccount(id, {
                        ...req.body.data,
                        role: parseInt(req.body.data.role),
                        lastUpdate: new Date(),
                    })

                    result.result = true
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    return res.status(200).send(result).end()
}

module.exports = editUserFunction