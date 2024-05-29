const { getDb } = require('../db')

const getEvents = async () => {
    return new Promise((resolve, reject) => {

        try {
            const db = getDb('getEvents')

            const sql = "select * from events"

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

module.exports = { getEvents }