
// Generate fak user data 

import { faker } from "@faker-js/faker";
function getRandomUser() {
  return [
     faker.datatype.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
     faker.internet.password(),
  ];
}

//  connect to mySql Databse
import mysql from "mysql2";

// create mySql connection
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "delta_app",
  password: "@dev0101", 
}); 

 
//let q = "SHOW TABLES"

// inserting new data
let q = "INSERT INTO user (id,username,email,password) VALUES (?,?,?,?)";// for add data array - ? , and for add single user (?,?,?,?) 
let user = getRandomUser()
let data = []
for(let i=0; i<=100; i++){
data.push(getRandomUser()) 
}
   

try {
  connection.query(q,user, (err, result) => {  
    if (err) throw err;
    console.log(result);
  });
} catch (error) {
  console.log(error);
}
connection.end() 



