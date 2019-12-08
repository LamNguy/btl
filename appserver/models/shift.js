let  mongoose = require('mongoose');
const  Schema = mongoose.Schema ;
const exam = require('../models/exam');

let shiftSchema = new Schema({

    id 	        : {
        type : String ,
        unique : true ,
        require : true ,
        trim : true
    },

    room 	    :{
       type: [ { type : Schema.Types.ObjectId  , ref:'Room' }],
       default : undefined
    },

    course      : {
        type :Schema.Types.ObjectId ,
        ref :'Course',
        default: undefined
    },
    date        : {
        type:Date
    },
     timeStart   : {
        type  : String
     },

    timeDuration: {
        type : String
    }

},{collection:'shift'});

shiftSchema.statics.PushShift2Exam = function(_idShift, _idExam , callback){
    this.findOne({id:_idShift}).exec((err,data)=>{
        if (err) callback(err,null);
        else{
            exam.findOneAndUpdate({id:_idExam},{$push:{shift:data}},function (err,data2) {
                if( err) callback(err,null);
                else callback(null,data2);
            })
        }
    })
}

shiftSchema.statics.ListShift = function(callback){
    this.find({}).exec(function (err,data) {
        if ( err) callback(err,null)
        else callback(null, data);
    })
}

shiftSchema.statics.CreateShift = function(_id  ,  _date,_timeStart , _timeDuration ,callback ) {
    new this({
        id :_id,
        date: _date,
        timeStart: _timeStart,
        timeDuration: _timeDuration
    }).save((err, data) => {
        if (err) {
            callback(err, null);
        } else callback(null, data);
    });
};

let shift = mongoose.model('Shift', shiftSchema);

module.exports= shift ;