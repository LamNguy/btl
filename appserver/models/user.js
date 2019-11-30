let mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema ( {
    id:  	    String,  // also username
    name:       String,
    email:      String,
    password:   String ,
},{collection:'user'});

let  user = mongoose.model('User', userSchema);

module.exports = user;


