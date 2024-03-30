const sqlite3 = require('sqlite3').verbose();

// Buat atau hubungkan ke database SQLite
const db = new sqlite3.Database('database.db');

// Buat tabel "users" jika belum ada
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);

// Buat model User
class User {
    static createUser(email, password, callback) {
        db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID); // Mengembalikan ID pengguna yang baru dibuat
        });
    }

    static getUserByEmail(email, callback) {
        return new Promise((resolve, reject) => { 
            db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static getUserById(id, callback) {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, row);
        });
    }
}

module.exports = User;
