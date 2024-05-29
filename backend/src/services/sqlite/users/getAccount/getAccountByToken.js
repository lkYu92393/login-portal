const { getAccountByParameter } = require('./getAccountByParameter')

const getAccountByToken = async (sessionToken) => {
    return await getAccountByParameter("sessionToken", sessionToken)
}

module.exports = { getAccountByToken }