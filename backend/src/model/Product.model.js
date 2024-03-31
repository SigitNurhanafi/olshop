const { timeStampCurentUTC } = require('../utils/timestamp');
const sqlite3       = require('sqlite3').verbose();
const db            = new sqlite3.Database('database.db');

db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price FLOAT UNSIGNED NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    sku TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)`);

class Product {
    static createProduct(name, price, description, category, sku) {
        return new Promise((resolve, reject) => {
            db.run(`
                INSERT INTO 
                    products 
                        (name, price, description, category, sku) 
                    VALUES 
                        (?, ?, ?, ?, ?)`,
                [name, price, description, category, sku], function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve(this);
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

    static getProductBySku(sku) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM products WHERE sku = ?`, [sku], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static updateProduct(id, {name, price, description, category, sku}) {
        return new Promise((resolve, reject) => {
            db.run(`
                UPDATE 
                    products 
                SET 
                    name = ?, 
                    price = ?,
                    description = ?,
                    category = ?,
                    sku = ?,
                    updated_at = ?
                WHERE 
                    id = ?`,
                [name, price, description, category, sku, timeStampCurentUTC(), id], (err) => {
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
            db.run(`
                DELETE 
                    FROM 
                        products 
                    WHERE 
                        id = ?`,
                [id], (err) => {
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
