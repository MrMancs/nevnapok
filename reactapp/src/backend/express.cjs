const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3333;

app.use(express());
app.use(cors());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nevnapok",
});

conn.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Sikeres csatlakozás ehhez az adatbázishoz:", conn.config.database);
  }
});



app.listen(port, () => {
  console.log("Szerver mükszik itt:", port);
});