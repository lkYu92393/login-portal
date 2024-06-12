const { getDb } = require('../../../../lib/sqlitedb')

const getAccounts = async () => {
    return new Promise((resolve, reject) => {

        try {
            const db = getDb('getAccounts')

            const sql = "select * from users where isDeleted=0"

            db.all(sql, [],
                (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    resolve(rows)
                });

            // close the database connection
            db.close();
        } catch (err) {
            console.log(err)
            resolve([])
        }
    })
}

module.exports = { getAccounts }