const { getDb } = require('../db')

const addAccount = async (data) => {


    return new Promise((resolve, reject) => {
    try {
        const db = getDb('addAccount')

        const sql = "INSERT INTO users values (?, ?, ?, ?, ?, ?, ?, ?, ?);"

        db.all(sql,
            [
                null,
                data.username,
                data.role,
                data.password,
                data.remarks,
                0,
                null,
                null,
                new Date()
            ],
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

module.exports = { addAccount }