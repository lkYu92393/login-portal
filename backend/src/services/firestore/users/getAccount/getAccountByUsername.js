const { getAccountByParameter } = require('./getAccountByParameter')

const getAccountByUsername = async (username) => {
    return await getAccountByParameter("username", username)
}

module.exports = { getAccountByUsername }