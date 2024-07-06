const { getDb } = require('lib/sqlitedb')

const updateEvent = async (id, data) => {
    return new Promise((resolve, reject) => {

        try {
            const db = getDb('removeEvent')

            const updateList = Object.keys(data).concat(['lastUpdatedTime'])
            const updateValue = Object.keys(data).map(key => data[key]).concat([new Date()])

            const sql = `update events set ${updateList.map(obj => obj + "=?").join(',')} WHERE id=?;`

            db.all(sql, updateValue.concat(id),
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

module.exports = { updateEvent }