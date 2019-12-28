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
    //sign a token
    jwt.sign({user: user}, 'secretkey', {expiresIn: '7200s'}, (err, token) => {
      res.json({
        token,
        authData: {user: user},
        message: "success",
        success: true
      })
    })
  }

exports.checkAdminToken = (req, res, next) => {
    //Synchronously
      try {
        //verify token for admin
        const decode = jwt.verify(req.token, 'secretkey')
          if(decode.user.level === 'admin')
            next();
          else res.sendStatus(403);
      } catch(err) {
        res.sendStatus(403)
      }
}

exports.checkStudentToken = (req, res, next) => {
    //Synchronously
    try {
      //verify token for user
      const decode = jwt.verify(req.token, 'secretkey')
        if(decode.user.level === 'user')
          next();
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
  try {
      const decode = jwt.verify(req.token, 'secretkey')
        res.json({token: req.token,
                  authData: decode,
                  message: 'logged successfully',
                  success: true
        });
      }
        catch(err) {
          res.sendStatus(403)
        }
}


exports.checkAdminPermission = (req, res) => {
    this.verifyToken(req, res);
    this.checkAdminToken(req, res);
}

exports.checkStudentPermission = (req, res, next) => {
    this.verifyToken(req, res, next);
    this.checkStudentToken(req, res, next);
}
