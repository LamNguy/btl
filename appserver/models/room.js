let uniqueValidator = require('mongoose-unique-validator');
let arrayUniquePlugin = require('mongoose-unique-array');
let message = require('../config/message');
//const shift = require('../models/shift');
const  mongoose = require('mongoose');
const Schema  = mongoose.Schema;


/*
 *  TODO: Define room schema
 */

let  roomSchema = new Schema({
    idRoom : {
        type: String ,
        required : [true ,message.canNotBlank] ,
        trim : true,
        unique : true ,
        maxlength : 10 ,
        index: true ,
    },
    // name  , slots :  null
    name : {
        type : String ,
        required : [true ,message.canNotBlank],
        trim : true
    },

    slots : {
        type : Number ,
        required : [true,message.canNotBlank],
        min : 30 ,
        max : 50 ,

    },

    status : {
        type : String ,
        required : [true ,message.canNotBlank],
        trim : true ,
        enum : ['used','not used']
    },

    // user enroll this room ????
    users :{
        type : [{ type : Schema.Types.ObjectId  , ref:'User',
            default: undefined, }],
    }


},{collection:'room'});

roomSchema.plugin(arrayUniquePlugin,{message:"Duplicated  array"});
roomSchema.plugin(uniqueValidator,{message:'Duplicated !!!'});



/*
 *  TODO: Define room schema methods
 */


// list
roomSchema.statics.ListRoom = function(){
    return new  Promise((resolve ,reject)=>{
        this.find({}).then(rooms=>{
            resolve(rooms);
        }).catch(err=>{

            reject(err);
        })
    })
};

// create
roomSchema.statics.CreateNewRoom = function ( _id, _name , _slots , _status ){

    return new  Promise((resolve ,reject)=>{
        new this({
            idRoom : _id ,
            name   : _name ,
            slots   :  _slots,
            status :  _status
        }).save(err => {
            if (err) {
                reject(err);
            }

            resolve(message.Success);
        });
    })
};

// update  @@@@
roomSchema.statics.UpdateRoom = function(update){
    return new  Promise((resolve ,reject)=>{
        const otp = { runValidators: true,context : 'query',new:true};
        this.updateOne({idRoom : update._id},{ $set: { name: update._id , slots : update._slots, status : update._status }},
            otp, function (err) {
                if (err) {
                    reject(err);
                }

                resolve(message.Success);
            });
    })
};

// delete
roomSchema.statics.RemoveRoom = function(_id){
    return new Promise(((resolve, reject) => {
        this.findOneAndDelete({idRoom:_id},function (err,room) {
            if ( err ) reject(err);
            if ( !room ) reject(message.canNotFound);

            resolve(message.Success);
        })
    }))
};

// find
roomSchema.statics.FindRoomByID = function(_id){
    return new  Promise(((resolve, reject) => {
        this.findOne({idRoom:_id}, function (err, room) {
            if ( err) {
                reject(err);
            }
            if ( ! room ) reject(message.canNotFound);

            resolve(room);
        }).populate([{
            path : "users",
            /*populate:{
                path:  "room course"
            }*/
        }])
    }))
};

/*
roomSchema.statics.PushRoom2Shift = function  ( _idRoom ,_idShift ){
    return new Promise(((resolve, reject) => {
        this.findOne({idRoom : _idRoom}).then((data,err)=>{

            if  ( err) reject(err);
            if ( ! data ) reject('can not find room to add');
            else if (data.status === "used" ) reject('room used');
                else {

                    const otp = {runValidators: true, context: 'query', new: true};

                    this.updateOne({idRoom: _idRoom}, {$set: {status: 'used'}}, otp, function (err) {

                        if (err) reject(err);
                        shift.updateOne({id:_idShift}, {$push : {room:data._id}},otp,err=>{
                            if (err) reject (err);
                            resolve('success');
                        })
                    })
                }
        })

    }))

};

// remove room to shift

roomSchema.statics.PullRoom2Shift = function  ( _idRoom ,_idShift ){
    return new Promise(((resolve, reject) => {
        this.findOne({idRoom : _idRoom}).then((data,err)=>{

            if  ( err) reject(err);
            if ( ! data ) reject('can not find room to add');
            else if (data.status === "not used" ) reject('room is not used');
            else {

                const otp = {runValidators: true, context: 'query', new: true};

                this.updateOne({idRoom: _idRoom}, {$set: {status: 'not used'}}, otp, function (err) {

                    if (err) reject(err);
                    shift.updateOne({id:_idShift}, {$pull : {room:data._id}},otp,err=>{
                        if (err) reject (err);
                        resolve('success');
                    })
                })
            }
        })

    }))

};  */


const room = mongoose.model('Room', roomSchema);


module.exports = room;
