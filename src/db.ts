import sqlite3 from "sqlite3";

const dbPath = "./databases/database.db";
const db = new sqlite3.Database(dbPath);

export default db;
