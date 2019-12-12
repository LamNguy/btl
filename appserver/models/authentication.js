const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

let authSchema = new Schema ( {
    account:  	   {
        type :String,
        unique : true ,
        require  : true ,
        trim : true
    } ,  // also username

    password : {
        type :  String,
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
authSchema.methods.comparePassword = (pass) => {
  return bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) throw err;
    if (isMatch) {
      return done(null, user, );
    } else {
      return done(null, false, {
        message: 'password incorrect!'
      })
    }
  })
}
*/
const auth = mongoose.model('Auth', authSchema);
module.exports = auth;
