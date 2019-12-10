const shift = require('../models/shift');
let  mongoose = require('mongoose');
let Schema  = mongoose.Schema;

const  roomSchema = new Schema({
    idRoom : {
        type: String,
        unique : true, // ?
        require : true ,
        trim : true
    },

    name : {
        type : String ,
        require : true ,
        trim : true
    },

    slots : {
        type : Number  ,
        min : 30 ,
        max : 50 ,
        require : true
    },

    status : {
        type : String ,
        require : true ,
        trim : true ,
        enum : ['used','not used']
    },

    // user enroll this room
    users :{
        type : [{ type : Schema.Types.ObjectId  , ref:'User' }],
        default: undefined
    }


},{collection:'room'});


roomSchema.statics.PushRoom2Shift = function  ( _idRoom ,_idShift ,  callback  ){

    this.find({idRoom : _idRoom}).exec((err,data)=>{
        if  ( err) callback(err,null)
        else {
            shift.findOneAndUpdate({id:_idShift}, {$push : {room:data}},function (err,data2) {
                if ( err) callback(err,null);
                else  callback(null,data2);
            })
        }
    })
}





let room = mongoose.model('Room', roomSchema);

module.exports = room;