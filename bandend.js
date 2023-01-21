const express = require('express')
const app = express()
const cors = require('cors')
const bodyPaser = require('body-parser') 
const mysql = require('mysql')
const cookieparser =require('cookie-parser')
const port = 3000

const connection = mysql.createConnection({
  host: 'mydb.cu6unrorcuye.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: '1234jack',
  database: 'vite'
})

app.use(bodyPaser.urlencoded({ extended: false }));
app.use(bodyPaser.json());


app.get('/', (req, res) => {
  var sql = "SELECT * FROM user "
  connection.query(sql, (err, rows, fields) => {
    if (err) throw err
    res.send(rows)
  })
})

app.listen(port)