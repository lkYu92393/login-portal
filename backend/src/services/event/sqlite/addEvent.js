const { getDb } = require('lib/sqlitedb')

const addEvent = async (data) => {
    return new Promise((resolve, reject) => {

        try {
            const db = getDb('getEvents')

            let sql = "insert into events values (?,?,?,?,?,?,?,?,?,?)"

            db.all(sql,
                [
                    null,
                    data.title,
                    data.username,
                    data.type,
                    data.location,
                    data.remarks,
                    data.start,
                    data.end,
                    new Date(),
                    new Date()
                ],
                (err, rows) => {
                    if (err) {
                        throw err;
                    }
                });

            sql = "select * from events where title=? and username=? and type=? and location=? and remarks=? and start=? and end=?"

            db.all(sql,
                [
                    data.title,
                    data.username,
                    data.type,
                    data.location,
                    data.remarks,
                    data.start,
                    data.end
                ],
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
            resolve([])
        }
    })
}

module.exports = { addEvent }