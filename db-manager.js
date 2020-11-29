const mysql = require('mysql');

class DBManager {

    _db;

    constructor() {
        this._db = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "collections"
        });

        this._db.connect(function (err) {
            if (err) throw err;

            console.log("Connecté à la base de données MySQL!");
        });
    }

    get db() {
        return this._db;
    }

    set db(value) {
        this._db = value;
    }
}

module.exports = DBManager;
