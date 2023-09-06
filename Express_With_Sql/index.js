const express = require("express")
const mysql = require("mysql2")
const app = express();
const PORT = 8080;
const path = require("path")
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"))
app.use(express.json())

// connect to MYSQL Database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "delta_app",
  password: "@dev0101",
});


//  route get all users count from database

app.get("/", (req, res) => {
  let q = `SELECT COUNT(*) FROM user`;
  try {
    connection.query(q, (err, result) => {  
      if (err) throw err;
      let count = result[0]["COUNT(*)"]
      
     res.render("home.ejs", { count })
    });
  } catch (error) {
    res.send("some error in Database")
  } 
});

//  route get all users from database
app.get("/users", (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, result) => {  
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    res.send("some error in Database")
  } 
});


// connect to server
app.listen(PORT, () => {
  console.log(`app listining on http://localhost:${PORT}`);
});
 
