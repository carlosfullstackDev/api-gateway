const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const port = 3000;
app.use(cors());


app.get('/githubSSO', (req, res) => {
  
    fetch('http://192.168.1.25:8080/api/github/auth')
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



passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/');
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});