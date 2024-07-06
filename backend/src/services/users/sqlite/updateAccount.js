const { getDb } = require('lib/sqlitedb')

const updateAccount = async (id, data) => {
    return new Promise((resolve, reject) => {

        try {
            const db = getDb('updateAccount')

            const updateList = Object.keys(data).concat(['lastUpdate'])
            const updateValue = Object.keys(data).map(key => data[key]).concat([new Date()])

            const sql = `UPDATE users set ${updateList.map(obj => obj + "=?").join(',')} WHERE id=?;`

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

module.exports = { updateAccount }