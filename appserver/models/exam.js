const  mongoose = require('mongoose');
const  Schema = mongoose.Schema ;
const shift = require('../models/shift');
const room =  require('../models/room');
const user =  require('../models/user');
const examSchema = new Schema({
    id          : {
        type : String ,
        unique : true ,
        trim   : true ,
        require : true
    },

    name        : {
        type : String ,
        require : true ,
    },
    shift	:{
        type: [{ type : Schema.Types.ObjectId  , ref:'Shift' }],
        default: undefined
    }

},{collection:'exam'});

examSchema.statics.CreateNewExam = function( _id, _name,callback){


    new this({
        id: _id,
        name :_name,
    }).save((err,data)=>{
        if ( err) callback(err,null);
        else  callback(null, data);
    })

};

examSchema.statics.PrintShifts = function ( _id , callback){
    this.find({})
        .populate({
            path: 'shift',
            populate: [{
                path : 'room'
            }, {
                path : 'course'
            }]
        })
        .exec(function(err,data){
            if (err) {
                callback(err,null);
            }
            else {
                callback(null,data);
            }
        });
}

examSchema.statics.PrintSchedules = function (_id, callback) {
    this.find({})
        .populate({
            path : 'shift',
            populate: [{
                path : 'room',
                select :'idRoom name slots status'


            }, {
                path : 'course',
                select :'id name lecturer num'

            }]
        })
        .exec(function(err,data){
            if (err) {
                callback(err,null);
            }
            else {
                callback(null,data);
            }
        });
}






const exam = mongoose.model('Exam', examSchema);

module.exports= exam ;