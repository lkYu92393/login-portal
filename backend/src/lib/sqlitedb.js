const config = require('../config')

const sqlite3 = require('sqlite3').verbose()
const getDb = (msg = "Connected to sqlite db.") => {
    return new sqlite3.Database('./example.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log(msg);
    })
}

const initDb = () => {
    const db = getDb()

    db.serialize(() => {
        const createUsersTableSql = 'create table IF NOT EXISTS users ( \
            id integer PRIMARY KEY ASC, \
            username TEXT NOT NULL, \
            role INTEGER NOT NULL, \
            password text NOT NULL, \
            remarks text NOT NULL, \
            isDeleted integer NOT NULL, \
            sessionToken text, \
            lastLogin DATETIME, \
            lastUpdate DATETIME NOT NULL \
            )'
        const createEventsTableSql = 'create table IF NOT EXISTS events ( \
            id integer PRIMARY KEY ASC, \
            title TEXT NOT NULL, \
            username text NOT NULL, \
            "type" text NOT NULL, \
            location text NOT NULL, \
            remarks text  NOT NULL, \
            "start" DATETIME NOT NULL, \
            "end" DATETIME NOT NULL, \
            createdTime DATETIME NOT NULL, \
            lastUpdatedTime DATETIME NOT NULL \
            )'
        db.run(createUsersTableSql)
        db.run(createEventsTableSql)
        
        const date = new Date()

        let stmt = null
        stmt = db.prepare("INSERT OR IGNORE INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        stmt.run(1, "test1", 100, "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08", "", 0, "", date, date)
        stmt.run(2, "test2", 100, "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08", "TEST2", 0, "", date, date)
        stmt.run(3, "test3", 50, "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08", "TEST3", 0, "", date, date)
        stmt.finalize();

        stmt = db.prepare("INSERT OR IGNORE INTO events VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
        stmt.run(1, "EVENT1", "test1", "FIX", "P1", "TEST", new Date(2024, 4, 28, 8, 0, 0), new Date(2024, 4, 28, 10, 0, 0), date, date)
        stmt.run(2, "EVENT2", "test1", "FIX", "L1", "TEST2", new Date(2024, 4, 28, 8, 0, 0), new Date(2024, 4, 28, 10, 0, 0), date, date)
        stmt.run(3, "EVENT3", "test2", "MAINT", "P3", "TEST3", new Date(2024, 4, 28, 8, 0, 0), new Date(2024, 4, 28, 10, 0, 0), date, date)
        stmt.finalize();
    });

    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Finished initialization.');
    });
}

if (config.db === 'sqlite') {
    initDb()
}

module.exports = { getDb }