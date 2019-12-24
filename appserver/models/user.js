//var Promise = require('bluebird');
let mongoose = require('mongoose');
let arrayUniquePlugin = require('mongoose-unique-array');
let uniqueValidator = require('mongoose-unique-validator');
let _validator =  require('../validator/validatetor');
let message = require('../config/message');
let async = require('async');

const exam = require('../models/exam');
const room = require("../models/room");
const Schema = mongoose.Schema;

let userSchema = new Schema ( {
    id: {
        type :String,
        required : [true,message.canNotBlank],
        trim : true,
        unique : true ,
        validate : [_validator.validateId, message.invalidId],
        index  : true
    } ,

    name: {
        type: String ,
        required : [true, message.canNotBlank],
        trim : true ,
        maxlength : 30 ,
        minlength : 5 ,
        validate : [_validator.validateName, message.invalidName],
    },

    email: {
        type: String,
        required : [true, message.canNotBlank],
        trim: true,
        unique: true,
        validate: [_validator.validateEmail, message.invalidEmail],
        index :true
    },

    enroll:{

        type : [{
            idExam: {
                type: String,
                required: [true, message.canNotBlank],
                trim: true
            },

            idShift: {
                type: String,
                required: [true, message.canNotBlank],
                trim: true,
            },

            idRoom: {
                type: String,
                required: [true, message.canNotBlank],
                trim: true,
            }
        }]


    },

    subject: {

            type:[
                {
                    idCourse :{
                        type : String ,
                        required : [true,message.canNotBlank],
                        trim : true
                    },

                    status :{
                        type:String ,
                        required : [true,message.canNotBlank],
                        trim : true ,
                        enum :['passed','failed']
                    }
            }],
       // unique : true
        //,default: undefined,

    }

},{collection:'user'});

userSchema.plugin(uniqueValidator,{message:'Duplicated object !'});
userSchema.plugin(arrayUniquePlugin,{message:"Duplicated element in  arrays"});



/*
 *      Service model
 */


// create user
userSchema.statics.CreateNewUser = function ( _id, _name , _email){
    return new Promise((resolve ,reject)=>{

        new this({
            id : _id ,
            name : _name ,
            email : _email
        }).save(err=>{
            if (err){
                reject(err);
            }

            resolve(message.Success);
        })
    });
};

// list user
userSchema.statics.ListUser = function(){
    return new Promise((resolve,reject)=>{
        this.find({}).exec((err,users)=>{
            if (err) {
                reject(err);
            }

            resolve(users);
        });
    })
};

// find user
userSchema.statics.FindUserByID = function(_id){

    return new Promise((resolve,reject)=>{
        this.findOne({id:_id}).exec().then((user=>{
            if( ! user ){
                reject(message.canNotFound);
            }
            resolve(user);
        })).catch(err=>{
            reject(err);
        })
    });

};

// @@@@update user
userSchema.statics.UpdateUser = function(request){

    return new Promise((resolve ,reject)=>{

        const otp = { runValidators: true,context : 'query',new:true};
        this.updateOne({id : request._id},{ $set: { name: request._name , email: request._email },},
            otp, function (err) {
                if (err) {
                    reject(err);
                }
                resolve(message.Success);
            });
    })
};

// delete user
userSchema.statics.RemoveUser = function(_id){
    return new Promise((resolve ,reject)=>{
        this.findOneAndDelete({id:_id},function (err,user) {

            if (err) reject(err);
            if (!user) reject(message.canNotFound);

            resolve(message.Success);
        });
    })
};

// student print enrollment @@@@
userSchema.statics.PrintEnrollment = function(_idUser){

    return new Promise((resolve ,reject)=>{
        let results = [];
        this.findOne({id:_idUser}).then((user)=>{

            if (!user) reject({message: 'can not  find user'});

            if ( ! user.enroll.length ) reject({message:'user not enroll exam'});
            if (user.enroll && user.enroll.length)  {

                async.each(user.enroll,(object,callback)=>{

                    exam.find({id:object.idExam})
                        .populate({
                            path : "shift",
                            match : [{
                                "id" : object.idShift
                            }],
                            populate:[{
                                path :"room",
                                match:[{
                                    idRoom: object.idRoom,

                                }],
                              //  select: "idRoom name",

                            },{
                                path  : "course",
                                //select : "name lecturer"
                            }]
                        }).exec()
                            .then(result=>{
                                results.push(result);
                                callback();
                            })

                },(err)=>{
                     if (err) console.log(err);
                     resolve(results);
                });
            }

        })
                                    .catch(err=> {
                                        console.log(err);})

    })



};

// student enroll @@@@
userSchema.statics.Enroll = function (_idUser, _idExam , _idShift , _idRoom ) {

    return new Promise(((resolve, reject) => {
        this.findOne({id:_idUser}).then((user,err)=>{

            if (err)  reject(err);
            if (!user) reject ({message:'can not find user'});


            exam.findOne({id:_idExam})
            .populate({
                path : "shift",
                match : [{
                    "id" : _idShift
                }],

                populate: {
                    path :"room",
                    match : [{
                        "idRoom" : _idRoom
                    }],

                }


            })
                .then((data)=>{
                    console.log(data);
                    if(_idRoom === data.shift[0].room[0].idRoom){

                        const otp = { runValidators: true,new:true};
                        room.updateOne({idRoom:_idRoom},{$push:{users:user._id},$inc:{slots:-1}},otp,err=>{

                            if (err) reject(err);

                            this.updateOne( {id:_idUser},{$push:{enroll:{
                                        idExam:_idExam,
                                        idShift :_idShift,
                                        idRoom :_idRoom
                                    }}}
                                    ,{new :true},function (err) {
                                    if (err) reject (err);
                                    resolve(message.Success);
                            });
                    });}

            }).catch(err=>{
                reject(err);
            })

        })
    }))

};

// student unroll @@@@
userSchema.statics.UnEnroll = function ( _idUser, _idExam ,_idShift ,_idRoom){
    return new Promise(((resolve, reject) => {
        const otp = { runValidators: true,context : 'query',new:true};
        this.findOneAndUpdate({id:_idUser},{$pull:{"enroll":{
                    idExam :_idExam,
                    idShift : _idShift ,
                    idRoom  : _idRoom
            }}},otp).then((user)=>{

                if (!user) reject('can not find user');

                room.updateOne({idRoom :_idRoom},{$pull:{users:user._id},$inc:{slots:1}},otp,function (err) {
                    if (err) reject(err);

                    resolve('success  un-enroll')
                });

        }).catch(err=>{
            reject(err);
        })
    }))
};

// ?????
userSchema.statics.checkExist = function (_idCourse,data) {
    for ( let i in  data.subject){
        if ( data.subject[i].idCourse === _idCourse) return true ;
    }
    return false ;
};

const user = mongoose.model('User', userSchema);
module.exports = user;
