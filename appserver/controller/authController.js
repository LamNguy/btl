/*
 *  TODO :
 */


const auth = require('../models/authentication');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const passport = require('passport')
const session = require('express-session')
require('../config/passport')(passport);


exports.signIn = (req, res) => {
    const user = req.user;
    jwt.sign({user: user}, 'secretkey', {expiresIn: '7200s'}, (err, token) => {
      res.json({
        token,
        authData: {user: user},
        message: "success",
        success: true
      })
    })
  }

exports.checkAdminToken = (req, res) => {
  /*jwt.verify(req.token, 'secretkey',  (err, authData) => {
    if(err || authData.user.level !== 'admin') {
      res.sendStatus(403);
    } else {
      res.json({
        authData,
        message: 'logged as admin successfully',
        success: true
      })
    }
  })*/



//Synchronously
  try {
    const decode = jwt.verify(req.token, 'secretkey')
      if(decode.user.level === 'admin')
        res.json({token: req.token,
                  authData: decode,
                  message: 'logged as admin successfully',
                  success: true
        });
      else res.sendStatus(403);
  } catch(err) {
    res.sendStatus(403)
  }
}

exports.checkStudentToken = (req, res) => {
  /*jwt.verify(req.token, 'secretkey',  (err, authData) => {
    if(err || authData.user.level !== 'user') {
      res.sendStatus(403);
    } else {
      res.json({
        authData,
        message: 'logged as student successfully',
        success: true
      })
    }
  })*/


  //Synchronously
  try {
    const decode = jwt.verify(req.token, 'secretkey')
      if(decode.user.level === 'user')
        res.json({token: req.token,
                  authData: decode,
                  message: 'logged as student successfully',
                  success: true
        });
      else res.sendStatus(403);
  } catch(err) {
    res.sendStatus(403)
  }
}

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  //check
  if(typeof bearerHeader !== 'undefined') {
    //split at the space
    const bearer = bearerHeader.split(' ');
    //get token from adminRouter
    const bearerToken = bearer[1];
    //set the token
    req.token = bearerToken
    next();
  } else {
    //forbidden
    res.sendStatus(403)
  }
}

exports.loggedToken = (req, res) => {
  /*jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        authData,
        message: 'logged successfully',
        success: true
      })
    }
  })*/



  try {
    const decode = jwt.verify(req.token, 'secretkey')
      res.json({token: req.token,
                authData: decode,
                message: 'logged successfully',
                success: true
      });
  } catch(err) {
    res.sendStatus(403)
  }
}
