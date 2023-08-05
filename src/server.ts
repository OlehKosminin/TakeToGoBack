const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();
import app from "./app";

const port = 3000;

const dbPath = "./databases/database.db";
const db = new sqlite3.Database(dbPath);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
