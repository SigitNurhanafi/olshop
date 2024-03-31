const sqlite3 = require('sqlite3').verbose();

// Buat atau hubungkan ke database SQLite
const db = new sqlite3.Database('database.db');

// Buat tabel "orders" jika belum ada
db.run(`
    CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    status TINYINT NOT NULL DEFAULT 0, -- Set default value to 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

// Buat model Order
class Order {
    static createOrder(productId, status, callback) {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO 
                orders 
                    (product_id, status) 
                VALUES 
                    (?, ?)`,
                [productId, status],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                });
        });
    }

    static getOrderById(id) {
        return new Promise((resolve, reject) => { 
            db.get(`SELECT 
                    id, product_id, status 
                FROM 
                    orders 
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

    static getOrderByStatus(status) {
        return new Promise((resolve, reject) => { 
            db.all(`SELECT 
                    id, product_id, status 
                FROM 
                    orders 
                WHERE 
                    status = ?`,
            [status], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static updateOrder(id) {
        return new Promise((resolve, reject) => { 
            db.all(`SELECT 
                    id, product_id, status 
                FROM 
                    orders 
                WHERE 
                    status = ?`,
            [status], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = Order;
