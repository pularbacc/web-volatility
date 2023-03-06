const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('./DB.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        db = new sqlite3.Database('DB.db', (err) => {
            if (err) {
                console.log("Getting error " + err);
                exit(1);
            }
            createTables();
        });
        return;
    } else if (err) {
        console.log("Getting error " + err);
        exit(1);
    }
});


function createTables() {
    db.exec(``, () => {
    });
}

module.exports = db