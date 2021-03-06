
let mongoose = require('mongoose');
let arrayUniquePlugin = require('mongoose-unique-array');
let uniqueValidator = require('mongoose-unique-validator');
let _validator =  require('../validator/validatetor');
let message = require('../config/message');
let async = require('async');

const exam = require('../models/exam');
const room = require("../models/room");
const Schema = mongoose.Schema;

/*
 *  TODO: Define user schema
 */

let userSchema = new Schema ({

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
        maxlength : 50 ,
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
                        type : Schema.Types.ObjectId
                        ,ref :'Course',
                        required : [true,message.canNotBlank]
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
 *  TODO: Define user schema methods
 */


// create
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

// list
userSchema.statics.ListUser = function(){
    return new Promise((resolve,reject)=>{
        this.find({})
            .populate([{
                path : "subject.idCourse"
            }])
            .exec((err,users)=>{
            if (err) {
                reject(err);
            }

            resolve(users);
        });
    })
};

// find
userSchema.statics.FindUserByID = function(_id){

    return new Promise((resolve,reject)=>{
        this.findOne({id:_id})
            .populate([{
                path : "subject.idCourse"
            }])
            .exec().then((user=>{
            if( ! user ){
                reject(message.canNotFound);
            }
            resolve(user);
        })).catch(err=>{
            reject(err);
        })
    });

};

// update @@
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

// delete
userSchema.statics.RemoveUser = function(_id){
    return new Promise((resolve ,reject)=>{
        this.findOneAndDelete({id:_id},function (err,user) {

            if (err) reject(err);
            if (!user) reject(message.canNotFound);

            resolve(message.Success);
        });
    })
};

// print enrollment @@
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

// enroll @@
userSchema.statics.Enroll = function ( request  ) {

    return new Promise(((resolve, reject) => {
        this.findOne({id:request.idUser})
            .populate([{
              path: "subject.idCourse"
            }])
            .then(result=>{
                if (! result ) reject ({message:'can not find user'});
               console.log(result.checkCourse(request.idCourse,result.subject))
                if( ! result.checkCourse(request.idCourse,result.subject)){
                    reject(message.Fail)
                }else {
                    const otp = { runValidators: true,new:true};
                    room.updateOne({idRoom:request.idRoom},{$addToSet:{users:result._id},$inc:{slots:-1}},otp,err=>{
                              console.log(result._id)
                              if (err) reject(err);
                              // todo : how add unique
                              this.updateOne( {id:request.idUser},{$addToSet:{enroll:{
                                              idExam:request.idExam,
                                              idShift :request.idShift,
                                              idRoom :request.idRoom
                                          }}}
                                  ,{new :true},function (err) {
                                      if (err) reject (err);
                                      resolve(message.Success);
                              });
                      })
                }

            })
            //  console.log(user)
            //console.log(request.idUser);
            //user.checkCourse(request.idCourse,user.subject
      }))

};

// un-enroll @@@@
userSchema.statics.UnEnroll = function ( _idUser, _idExam ,_idShift ,_idRoom){
    return new Promise(((resolve, reject) => {
        const otp = { runValidators: true,context : 'query',new:true};
        this.findOneAndUpdate({id:_idUser},{$pull:{"enroll":{
                    idExam :_idExam,
                    idShift : _idShift ,
                    idRoom  : _idRoom
            }}},otp).then((user)=>{

                if (!user) reject('can not find user');

                room.updateOne({idRoom :_idRoom},{ $pull: {users: {$in: [user._id]}},$inc:{slots:1}},otp,function (err) {
                    if (err) reject(err);

                    resolve('success  un-enroll')
                });

        }).catch(err=>{
            reject(err);
        })
    }))
};

const course = require("../models/course");
// todo: check course is qualified ?
userSchema.methods.checkCourse =  function(_idCourse ,data){

    for  ( let i in data) {
        if (data[i].idCourse.id == _idCourse && data[i].status === 'Qualified') return true;
    }
    return false ;
};


const user = mongoose.model('User', userSchema);
module.exports = user;
