const { getDb } = require('../../../../lib/sqlitedb')

const getAccountByParameter = async (parameter, value) => {
    return new Promise((resolve, reject) => {

        let account = null
        try {
            const db = getDb("getAccountByParameter")
    
            const sql = `select * from users where ${parameter}=? and isDeleted=0`
    
            db.all(sql, [value],
                (err, rows) => {
                    if (err) {
                        throw err;
                    }
    
                    if (rows.length > 0) {
                        resolve(rows[0])
                    } else {
                        resolve(null)
                    }
                });
    
            // close the database connection
            db.close();
        } catch (err) {
            console.log(err)
            resolve(null)
        }
    })
}

module.exports = { getAccountByParameter }