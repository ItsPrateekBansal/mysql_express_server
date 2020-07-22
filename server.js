const express = require('express');
const app = express();
const mysql = require('mysql2');
const ejs = require('ejs');
const db = require('./db.js');
app.use(express.json());
app.set('view engine',"ejs");
app.use(express.urlencoded({extended:true}))
const bodyParser = require('body-parser');



app.get("/",(req,res)=>{

   db.getAllPersons()
      .then((persons)=>{
        res.render('persons',{persons})
        console.log(persons[0]['NAME']);
      })
      .catch((err=>{
        res.send(err)
      }))

});

app.get('/addperson',(req,res)=>{
  res.render('persons_add',{});
});

app.post('/add',(req,res)=>{
  console.log(req.body);
  //
  db.addNewPerson(req.body.NAME,req.body.AGE,req.body.CITY)
    .then(res.redirect("/"))
    .catch((err)=>res.send(err))
})

app.listen(3000, (req, res) => {
  console.log("Server started at http://localhost:3000/");
});
