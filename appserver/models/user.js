let mongoose = require('mongoose');
const exam = require('../models/exam');
const shift =  require("../models/shift");
const room = require("../models/room");
let uniqueValidator = require('mongoose-unique-validator');
let _validator =  require('../validator/validatetor');
const Schema = mongoose.Schema;
const message = require('../config/message')



let userSchema = new Schema ( {
    id: {
        type :String,
        unique : true ,
        trim : true,
        validate : [_validator.validateId, message.invalidId],
        required : [true,message.canNotBlank],
        index  : true
    } ,

    name: {
        type: String ,
        trim : true ,
        maxlength : 30 ,
        minlength : 5 ,
        validate : [_validator.validateName, message.invalidName],
        required : true
    },

    email: {
        type: String,
        trim: true,
        unique: true,
        required : [true, message.canNotBlank],
        index :true,
        validate: [_validator.validateEmail, message.invalidEmail]
    },

    enroll:[
        {
            idExam: String,
            idShift: String,
            idRoom: String
        }],

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

userSchema.plugin(uniqueValidator,{message:'Duplicated !!!'});

// create new user
userSchema.statics.CreateNewUser = function ( _id, _name , _email,callback ){

    new this({
        id : _id ,
        name : _name ,
        email : _email
    }).save((err,data)=>{
       if ( err) {

           callback(err,null);
       }

       if (!data) callback(null,message.canNotCreate);
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

// find an user by id
userSchema.statics.FindUserByID = function(_id , callback ){
    this.findOne({id:_id}, function (err, data) {
        if ( err) {
            callback(err, null);
        }

        if (!data) callback(null,message.canNotFound);
        else callback(null, data);
    })
};

// update user
userSchema.statics.UpdateUser = function(update, callback){
    let otp = { runValidators: true,context : 'query',new :true};
    this.findOneAndUpdate({id : update._id},{ $set: { name: update._name , email: update._email },},
        otp, function (err, data ) {

            if (err) {
                callback(err,null)
            }

            if(!data) callback(null,message.NotFoundUpdate);
            else callback(null,data)
        });

};

// delete user
userSchema.statics.RemoveUser = function(_id,callback){
    this.findOneAndRemove({id:_id},function (err,data) {
        if ( err ) callback(err,null) ;
        if (!data) callback(null,message.NotFoundDelete);
        else callback(null, data);
    })
};

// user print enrollment
userSchema.statics.PrintEnrollment = function(_idUser,callback){
    this.findOne({id:_idUser},function (err,user) {
        if(err) callback(err,null);

        if (!user) callback(null,'User can not find');
        else {
            for( let i in user.enroll){
                let _enroll = user.enroll[i];
                exam.find({id:_enroll.idExam},function(err,_exam){
                    if (err) callback(err,null);
                })
                    // populate path
                .populate({
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
                })
                    .exec((err,result)=>{
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


userSchema.statics.checkExist = function (_idCourse,data) {
    for ( let i in  data.subject){
        if ( data.subject[i].idCourse === _idCourse) return true ;
    }

    return false ;
}



let  user = mongoose.model('User', userSchema);

module.exports = user;


