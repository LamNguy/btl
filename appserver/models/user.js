let mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema ( {
    id:  	    String,  // also username
    name:       String,
    email:      String,
    password:   String ,
},{collection:'user'});


userSchema.methods.NewUser = function ( _id, _name , _email , _password ){
    this.id = _id ;
    this.name = _name
    this.email = _email ;
    this.password = _password ;


    this.save((err) => {
        if (err) {
            console.log("error");
        }
        else{
            console.log('success');
        }

    });

}



let  user = mongoose.model('User', userSchema);

module.exports = user;


