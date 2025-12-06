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
    console.log(
      "Sikeres csatlakozás ehhez az adatbázishoz:",
      conn.config.database
    );
  }
});

app.get("/api/nevnapok/", (req, res) => {
  const napObj = req.query?.nap;

  if (!napObj) {
    res.status(404).json({ error: "Invalid query!" });
    return;
  }

  const reszek = napObj.split("-");
  const honap = +reszek[0];
  const nap = +reszek[1];

  conn.query(
    `SELECT * FROM nevnap WHERE ho = ? AND nap = ?`,
    [honap, nap],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Database error" });
        return;
      }

      res.status(200).json({
        datum: `${honap}-${nap}`,
        nevnap1: results[0]?.nev1,
        nevnap2: results[0]?.nev2,
      });
    }
  );
});

app.listen(port, () => {
  console.log("Szerver mükszik itt:", port);
});
