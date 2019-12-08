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

    enroll :[
        {
            idExam: String,
            idShift: String,
            idRoom: String
        }
    ],

    subject:[
        {
            idCourse :String ,
            status :{
                type:String ,
                enum :['passed','failed']
            }
        }
    ]







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


userSchema.statics.PrintEnrollment = function(_idUser,callback){
    this.findOne({id:_idUser},function (err,user) {
        if(err) callback(err,null)
        else {
            for( var i in user.enroll){
                let _enroll = user.enroll[i];
                exam.find({id:_enroll.idExam},function(err,_exam){
                    if (err) callback(err,null);
                }).populate({
                    path : "shift",
                    match : [{
                        "id" : _enroll.idShift
                    }],
                    populate:[{
                        path :"room",
                        match:[{
                            idRoom: _enroll.idRoom,

                        }],
                        select: "idRoom name",




                    },{
                        path  : "course",
                        select : "name lecturer"
                    }],



                }).exec((err,result)=>{
                    if (err) callback(err,null);
                    else callback(null,result);
                })
            }


        }

    })
}


userSchema.statics.Enroll = function (_idUser, _idExam , _idShift , _idRoom ,idCourse, callback) {

    this.findOne({id:_idUser}).exec((err,user)=>{
        if (err)  callback(err,null);
        else {
            exam.findOne({id:_idExam},function (err,_exam) {
                if (err) callback(err, null);
            }).populate({
                path : "shift",
                match : [{
                    "id" : _idShift
                }],
                populate:{
                    path :"room",
                    match:[{
                        idRoom:_idRoom
                    }]

                }


            }).exec((err,data)=>{
                if (err) callback(err,null)
                if(_idRoom === data.shift[0].room[0].idRoom){
                    room.findOneAndUpdate({idRoom:_idRoom},{$push:{users:user},$inc:{slots:-1}},{ new: true },function (err,response) {
                        if (err) callback(err,null);
                        else callback(null,response);
                    });

                    this.findOneAndUpdate({id:_idUser},{$push:{enroll:{
                            idExam:_idExam,
                            idShift :_idShift,
                            idRoom :_idRoom
                            }}},{new:true},function (err,users) {
                        if(err) console.log(err);
                       else console.log(users)
                    });
                }

            })
        }
    })

}

let  user = mongoose.model('User', userSchema);

module.exports = user;


