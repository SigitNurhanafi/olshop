const sqlite3 = require('sqlite3').verbose();

// Buat atau hubungkan ke database SQLite
const db = new sqlite3.Database('database.db');

// Buat tabel "products" jika belum ada
db.run(`CREATE TABLE IF NOT EXISTS products (
    id BIGINT PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price FLOAT NOT NULL,
    description TEXT NOT NULL,
    sku TEXT NOT NULL UNIQUE
)`);

// Buat model Product
class Product {
    static createProduct(name, price, description, sku) {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO 
                products 
                    (name, price, description, sku) 
                VALUES 
                    (?, ?, ?, ?)`,
                [name, price, description, sku], function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve(this.lastID);
                });
        });
    }

    static getAllProducts() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM products`, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static getProductById(id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM products WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static updateProduct(id, name, price, description, sku) {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE products SET name = ?, price = ?, description = ?, sku = ? WHERE id = ?`,
                [name, price, description, sku, id], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
        });
    }

    static deleteProduct(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM products WHERE id = ?`, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = Product;
