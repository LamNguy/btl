var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
const User = require('../appserver/models/authentication')
const jwt = require('jsonwebtoken')
const authController = require('../appserver/controller/authController')

/*
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

*/




router.post('/',
  passport.authenticate('local', {
    //successRedirect: 'http://localhost:5000/home',
    //failureRedirect: '/index/login',
    //failureFlash: false
  }),
  authController.signIn
  );


router.get('/', authController.verifyToken, authController.loggedToken)
//============================session========================

router.get('/token', authController.verifyToken, authController.loggedToken)

module.exports = router;
