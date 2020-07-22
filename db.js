const mysql = require('mysql2');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'myuser',
  password : 'myuser',
  database : 'mytestdb'
});

function getAllPersons() {

  return new Promise(function(resolve,reject){
    connection.query(
      `SELECT * FROM persons`,
      function(err,rows,cols){
        if(err){
          reject(err)
        }
        else{
          resolve(rows)
        }
      }
    )
  })
}

function addNewPerson(name,age,city){
  return new Promise(function(resolve,reject){
    connection.query(
      `INSERT INTO persons(NAME,AGE,CITY) VALUES(?,?,?)`,
      [name,age,city],
      function(err){
        if(err){
          reject(err)
        }
        else{
          resolve(function(){console.log("SUCCESSFULLY ADDED");})
        }
      }
    )
  })
}

module.exports = {
  getAllPersons: getAllPersons,
  addNewPerson: addNewPerson
}
