const express = require('express')
const cors = require('cors')
const bodyPaser = require('body-parser') // ແປງຂໍ້ມູນເປັນ JSON
const app = express()
const port = 3003
const mysql = require('mysql')
const cookieparser =require('cookie-parser')


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12jack@@',
  database: 'vite',
  port: "3308"
})

connection.connect()

app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}))

app.use(cookieparser())

// const corsOptions = {
//   origin: "http://localhost:5173",
//   optionsSuccessStatus: 200
// };


// app.use(cors(corsOptions))


app.use(bodyPaser.urlencoded({ extended: false }));
app.use(bodyPaser.json());



app.get('/getuser/:userid', (req, res) => {
  var sql = "SELECT * FROM user WHERE id = ?"
  connection.query(sql, [req.params.userid], (err, rows, fields) => {
    if (err) throw err
    res.send(rows)
  })
})
app.post('/user', (req, res) => {
  var username = req.body.username
  var email = req.body.email
  var password = req.body.password
  var params = [username, email, password]
  // res.send("what"+username)
  var sql = "INSERT INTO user (username, email, password) VALUES(?, ?, ?)"
  connection.query(sql, params, (err, rows, fields) => {
    if (err) throw err

    //  var data ={
    //     data: rows,
    //     status: 200,
    //     massage:"success"
    //  }

    // res.send('sucess')
    if (err) {
      throw err
    } else {
      if (rows.legth > 0) {
        let data ={
          status:200,
          message:"seccess"
        }
        res.send(data)

      } 
      else {
        res.send('fail')
      }
    }
  })
})
app.delete('/go/:userid', (req, res) => {
  // var username = req.body.username
  // var firsname = req.body.firsname
  // var lastname = req.body.lastname
  var email = req.body.email
  var password = req.body.password
  // var title = req.body.title
  // var id = req.body.id
  // var params = [username,firsname,lastname,email,password,title]
  var params = [email, password]
  // var id = req.params.userid
  var sql = "DELETE FROM user WHERE id = ?"
  connection.query(sql, params, (err, rows, fields) => {
    if (err) throw err
    res.send('delete success')
  })

})
app.put('/update', (req, res) => {

  // var username = req.body.username
  // var firsname = req.body.firsname
  // var lastname = req.body.lastname
  var email = req.body.email
  var password = req.body.password
  // var title = req.body.title
  // var id = req.body.id
  // var id = req.body.id
  // var params = [username,firsname,lastname,email,password ,title,id]
  var params = [email, password]
  // var sql = "UPDATE user SET username = ? ,firsname = ?,lastname = ? , email = ? , password = ?, title = ? WHERE  id = ?"
  var sql = "UPDATE user SET  email = ? AND password = ?"
  connection.query(sql, params, (err, rows, fields) => {
    if (err) throw err
    res.send("update sucess")
  })
  // res.send(req.body)
})

// login page
app.post("/login", (req, res) => {
  // var username = req.body.username
  // var firsname = req.body.firsname
  // var lastname = req.body.lastname
  var email = req.body.email
  var password = req.body.password
  // var title = req.body.title
  // var id = req.body.id
  var params = [email, password]
  // var sql ="SELECT id FROM users WHERE email = ? AND password = ? ";
  var sql = "SELECT id FROM user WHERE email = ? AND password = ?"
  connection.query(sql, params, (err, rows, fields) => {
    if (err) {
      throw err
    } else {
      // if (rows.length > 0) {
      //   res.send('sucess')
      // } else {
      //   res.send('faild')
      // }
      console.log(rows)
      if (rows.length > 0) {
        res.cookie("login",rows[0].id)
        let data = {
          status: 200,
          message: 'success'
        }
        res.send(data)
      }
      else {
        res.send('failed')
      }
    }
  });
}
);
app.post('/isloggedIn',(req,res) =>{
  console.log(req.cookies)
  if(req.cookies.login){
    let data ={
      status:200,
      message:"logged in"
    }
    res.send(data)
  }else{
  res.send('no cook')
  }
})

//   app.use(bodyPaser.urlencoded({ extended: false }));
//   app.use(bodyPaser.json());
app.listen(port)