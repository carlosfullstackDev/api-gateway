const cors = require('cors');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config()


const app = express();
app.use(cors());



const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.REACT_APP_DB_HOST,
  user:  process.env.REACT_APP_DB_USER,
  password:  process.env.REACT_APP_DB_PASS,
  database:  process.env.REACT_APP_DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }



  console.log('Connected to MySQL database!');
});



app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Middleware
app.use(express.json());


app.get('/githubSSO', (req, res) => {
  
  fetch('http://192.168.1.29:8080/api/github/auth')
  .then(response => {
    if (!response.ok) {
      res.send('Error!');

    } else {
      res.send('I win!');

    }
  })
  .catch(error => {
    console.log("error");
  });

});




app.post('/login', (req, res) => {


  const { user, pass } = req.body;
  

  try {
    connection.query("SELECT * FROM customers WHERE email = ? AND password = ?", [user, pass], function (err, recordset) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify("Error while querying database :- " + err));
        } else {
            if (recordset.length > 0) {
                console.log("Usuario identificado correctamente");
                res.status(200).send("Usuario identificado correctamente");
            } else {
                console.log("Usuario [" + user + "] no existe");
                res.send("USUARIO NO EXISTE" + user + pass);
            }
        }
    });
} catch (err) {
    console.log("Error while querying database :- " + err);
    res.send(JSON.stringify("Error while querying database :- " + err));
}

});


  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });


