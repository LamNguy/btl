let  mongoose = require('mongoose');
let Schema  = mongoose.Schema;

const  roomSchema = new Schema({
    id : String,
    //location: String ,
    course :   { type : Schema.Types.ObjectId   , ref:'Course' }  ,
    numberOfComputers : Number
},{collection:'room'});

let room = mongoose.model('Room', roomSchema);

module.exports = room;