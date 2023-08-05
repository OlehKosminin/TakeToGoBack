const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();
const app = require("./app");

const { PORT = 3000 } = process.env;

const db = new sqlite3.Database("mydatabase.db", (err) => {
  if (err) {
    console.error("Error on connnect:", err.message);
  } else {
    console.log("Connect success SQLite");
  }
});

app.get("/", (req, res) => {
  res.send("Hello Express with SQLite");
});

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
