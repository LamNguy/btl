let mongoose = require('mongoose');
const exam = require('../models/exam');
const shift =  require("../models/shift");
const room = require("../models/room");
let uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let userSchema = new Schema ( {
    id:  	   {
        type :String,
        unique : true ,
        require  : true ,
        trim : true
    } ,  // also username

    name: {
        type: String ,
        trim :true ,
        require : true
    },

    email:     {
        type: String,
        maxlength: 30,
        minlength: 10,
        lowercase: true,
        trim: true,
        unique: true,
        //validate: [emailValidator, 'invalid email']
    },

    subject : {
        type : [{
            idCourse : String ,
            status : String ,

        }],

        default : undefined
    }




},{collection:'user'});



// constructor
userSchema.statics.CreateNewUser = function ( _id, _name , _email,callback ){

    new this({
        id : _id ,
        name : _name ,
        email : _email
    }).save((err,data)=>{
       if ( err) {
           callback(err,null);
       }
       else callback(null,data);
    });


};

// list users
userSchema.statics.ListUser = function(callback){
    this.find({}).exec(function(err,users){
        if (err) {
            callback(err, null);
        }
        else {
            callback(null,users);
        }
    });
};

// find user by id
userSchema.statics.FindUserByID = function(_id , callback ){
    this.findOne({id:_id}, function (err, data) {
        if ( err) {
            callback(err, null);
        }
        else callback(null, data);
    })
};

// update user : put
userSchema.statics.UpdateUser = function(update, callback){
    this.findOneAndUpdate({id : update._id},{ $set: { name: update._name , email: update._email }},
        { new: true }, function (err, data ) {
            if (err) {
                callback(err,null)
            }
            else callback(null,data)

        });
};

// delete user : get
userSchema.statics.RemoveUser = function(_id,callback){
    this.findOneAndRemove({id:_id},function (err,data) {
        if ( err ) callback(err,null) ;
        else callback(null, data);
    })
};


userSchema.statics.Enroll = function (_idUser, _idExam , _idShift , _idRoom , callback) {


    this.findOne({id:_idUser },function (err,_data) {
        if (err) callback(err,null);
        else  {
            if (exam.exists({
                id :_idExam ,
                shift : {
                    $elemMatch :{"shift.id":_idShift,

                    }
                },


            },function (err,message) {
                if(err) callback(err,null);
                else callback(null,message);
            }));

        }

    })


}


let  user = mongoose.model('User', userSchema);

module.exports = user;


