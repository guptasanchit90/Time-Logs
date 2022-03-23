const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description text,
            start datetime,
            end datetime,
            createdOn datetime default current_timestamp
            )`,
            (err) => {
                if (err) {
                    console.log('Table already exists.')
                } else {
                    console.log('Table created.')
                }
            });
    }
});


module.exports = db