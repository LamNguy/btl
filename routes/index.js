var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
const User = require('../appserver/models/authentication')


const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/index/login')
  } else next();
}

const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/index/home')
  } else next();
}


/* GET home page. */
router.get('/home', function(req, res, next) {

  res.send('logged');
})

router.get('/data' , function (req, res) {
  res.send({name: 'Nguyen Duc Lam'});
});




router.get('/loginSuccess', (req, res) => {
  res.send(`login success`);
  console.log(JSON.stringify(req.session.passport))
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/index/home',
    failureRedirect: '/index/login',
    failureFlash: false
  })(req, res, next);
})

router.get('/login', (req, res) => {
  res.send(`please login`)
})


//============================session========================


module.exports = router;
