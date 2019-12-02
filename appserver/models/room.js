let  mongoose = require('mongoose');
let Schema  = mongoose.Schema;

const  roomSchema = new Schema({
    idRoom : String,
    auditorium : String ,
    slots : Number ,
    status : String
},{collection:'room'});

roomSchema.methods.NewRoom = function(_idRoom , _auditorium , _slots , _status){
    this.idRoom = _idRoom ;
    this.auditorium = _auditorium ;
    this.slots = _slots ;
    this.status = _status ;

    this.save((err) => {
        if (err) {
            console.log("error");
        }
        else{
            console.log('success');
        }

    });


}



let room = mongoose.model('Room', roomSchema);

module.exports = room;