const express = require("express");
const mysql = require("mysql2");
const methodOverride = require("method-override");
const app = express();
const PORT = 8080;
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// connect to MYSQL Database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "delta_app",
  password: "@dev0101",
}); 

//  route get users count from database
app.get("/", (req, res) => {
  let q = `SELECT COUNT(*) FROM user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["COUNT(*)"];
 
      res.render("home.ejs", { count });
    });
  } catch (error) {
    res.send("some error in Database");
  }
});

//  route Get all users from database
app.get("/users", (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.render("users.ejs", { result });
    });
  } catch (error) {
    res.send("some error in Database");
  }
});

//  route Edit username form
app.get("/user/:id/edit", (req, res) => {
  let id = req.params.id;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (error) {
    res.send("some error in Database");
  }
});

//  route Update username from database
app.patch("/user/:id", (req, res) => {
  let id = req.params.id;
  let { password: formPass, username: newusername } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formPass !== user.password) {
        res.send("wrong password");
      } else {
        let q2 = `UPDATE user SET username='${newusername}' WHERE id="${id}"`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/users");
        });
      }
    });
  } catch (error) {
    res.send("some error in Database");
  }
});

//  route Delte user
app.get("/user/:id/delete", (req, res) => {
  let id = req.params.id;
  let q = `DELETE FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      res.redirect("/users");
    });
  } catch (error) {
    res.send("some error in Database");
  }
});

//  add new user
app.get("/new", (req, res) => {
  res.render("new.ejs");
});

function autoId() {
  const char = "qwertyuiopasdfghjklzxcvbnm";
  const num = "1234567-890123456789-0123456";
  let id = "";
  for (let i = 0; i < 18; i++) {
    let math = Math.floor(Math.random() * 25);
    id += char[math] + num[math];
  }
  return id.slice(0, 35);
}
app.post("/users/new", (req, res) => {
  const id = autoId();
  const { username, email, password } = req.body;
  const q = `INSERT INTO user (id,username,email,password) VALUES ('${id}','${username}','${email}','${password}')`;
  try {
    connection.query(q, (result, err) => {
      res.redirect("/users");
    });
  } catch (error) {
    res.status(400).send({ success: false, message: "something went wrong" });
  }
});

// connect to server
app.listen(PORT, () => {
  console.log(`app listning on http://localhost:${PORT}`);
});
