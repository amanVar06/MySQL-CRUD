const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@MaN8316",
  database: "test",
});

// If there is a auth problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY  'password';

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello! This is the backend",
  });
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({
      success: true,
      results: data.length,
      data: data,
    });
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`)  VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.status(201).json({
      success: true,
      message: "Book has been created successfully!",
    });
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({
      success: true,
      message: "Book has been deleted successfully!",
    });
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ?  WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({
      success: true,
      message: "Book has been updated successfully!",
    });
  });
});

app.listen(8800, () => {
  console.log("Connected to Backend!");
});
