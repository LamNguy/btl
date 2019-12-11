const  mongoose = require('mongoose');
const  Schema = mongoose.Schema ;
const  message = require('../config/message');

const  examSchema = new Schema({
    id:{
        type : String ,
        required :[true,message.canNotBlank],
        unique : true ,
        trim   : true,
        maxlength: 10
    },

    name : {
        type : String ,
        required : true ,
        trim : true,
        maxlength:30 ,
        minlength:11
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

examSchema.statics.FindShift = function (_id,callback) {
    this.find({id:_id}).exec((err,exam)=>{
        if (err) callback(err,null);
        else callback(null,exam);
    })
}




const exam = mongoose.model('Exam', examSchema);

module.exports= exam ;