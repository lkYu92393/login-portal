const { getDb } = require('../db')

const updateEvent = async (id, data) => {
    return new Promise((resolve, reject) => {

        try {
            const db = getDb('removeEvent')

            const sql = "update events set where id=?"

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
    const eventsDocument = await firestore
    .collection("garageEvents")
    .doc(id)
    .update(data)

    return eventsDocument
}

module.exports = { updateEvent }