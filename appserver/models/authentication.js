const mongoose = require('mongoose');
const crypto = require('crypto');
let uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let authSchema = new Schema ( {
    account:  	   {
        type :String,
        unique : true ,
        require  : true ,
        trim : true
    } ,  // also username

    password : {
        type :  String
    },
    /*
    auth:{
       // salt: String ,
       // password : String ,
        //require : true

    }, */

    level :  {
        type : String,
        enum : ['admin', 'user'],
        require : true
    }

},{collection:'authentication'});

/*
authSchema.methods.validatePassword = function (password) {
    return sha512(password, this.auth.salt) === this.auth.password;
};


var genRandomString = function (length) {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

var sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var hashedPassword = hash.digest('hex');
    // return {
    //   salt: salt,
    //   password: hashedPassword
    // };
    return hashedPassword;
}; */


const auth = mongoose.model('Auth', authSchema);
module.exports = auth;


