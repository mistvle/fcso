// db.js

const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

// create data folder
const dataPath = path.join(__dirname, "data");

if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath);
}

// create database
const db = new Database(path.join(dataPath, "infractions.sqlite"));

// infractions table
db.prepare(`
CREATE TABLE IF NOT EXISTS infractions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    moderator_id TEXT NOT NULL,
    type TEXT NOT NULL,
    reason TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    revoked_by TEXT,
    revoked_at TEXT
)
`).run();

module.exports = db;