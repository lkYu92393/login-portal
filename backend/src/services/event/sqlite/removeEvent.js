const { getDb } = require('lib/sqlitedb')

const removeEvent = async (id) => {
    return new Promise((resolve, reject) => {

        try {
            const db = getDb('removeEvent')

            const sql = "delete from events where id=?"

            db.all(sql, [id],
                (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    resolve(true)
                });

            // close the database connection
            db.close();
        } catch (err) {
            console.log(err)
            resolve(false)
        }
    })
}

module.exports = { removeEvent }