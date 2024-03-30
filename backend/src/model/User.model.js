const sqlite3 = require('sqlite3').verbose();

// Buat atau hubungkan ke database SQLite
const db = new sqlite3.Database('database.db');

// Buat tabel "users" jika belum ada
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    reset_token NULL UNIQUE,
    password TEXT NOT NULL
)`);

// Buat model User
class User {
    static createUser(email, fullname, password, callback) {
        db.run(`INSERT INTO 
            users 
                (email, fullname, password) 
            VALUES 
                (?, ?, ?)`,
            [email, fullname, password], 
        function (err) {            
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID);
        });
    }

    static getUserByEmail(email) {
        return new Promise((resolve, reject) => { 
            db.get(`SELECT * 
                FROM 
                    users 
                WHERE 
                    email = ?`, 
                [email], 
            (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static getUserById(id) {
        return new Promise((resolve, reject) => { 
            db.get(`SELECT 
                    id, email, fullname 
                FROM 
                    users 
                WHERE 
                    id = ?`,
            [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
}

module.exports = User;
