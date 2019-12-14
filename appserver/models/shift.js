let  mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let arrayUniquePlugin = require('mongoose-unique-array');
let validator = require('../validator/validatetor');
let message = require('../config/message');
const  Schema = mongoose.Schema ;
const exam = require('../models/exam');


let shiftSchema = new Schema({

    id :{
        type : String ,
        require : [true ,message.canNotBlank],
        trim : true,
        unique : true ,
        index : true
    },

    room :[{

        type :Schema.Types.ObjectId
        ,ref:'Room',
        unique: true,
          //  index : true,
          //  default : undefined

    }],

    course : {
        type : {
            type :Schema.Types.ObjectId ,
            ref :'Course'
        }

       // default: undefined
    },

    date : {
        type:String,
        required : [true ,message.canNotBlank],
        trim : true,
        validate : [validator.validateDate, message.invalidDate]

    },

    timeStart: {
        type  : String,
        required : [true,message.canNotBlank],
        trim : true ,
        validate: [validator.validateTime,message.invalidTime]
     },

    timeDuration: {
        type : String,
        required : [true,message.canNotBlank]
    }

},{collection:'shift'});

shiftSchema.plugin(uniqueValidator,{message:'Duplicated object !'});
shiftSchema.plugin(arrayUniquePlugin,{message:"Duplicated element in  arrays"});


// find shift
shiftSchema.statics.FindShift = function(_id){
    return new Promise(((resolve, reject) => {
        this.find({id:_id}).exec(function (err,shift) {
            if (err) reject(err);
            if (!shift) reject('can not find');

            resolve(shift)
        })
    }))
};

// list shift
shiftSchema.statics.ListShift = function(){
    return new Promise(((resolve, reject) => {
        this.find({}).exec(function (err,shifts) {
            if (err) reject(err);
            if (!shifts) reject('can not find');

            resolve(shifts)
        })
    }))
};

// create shift
shiftSchema.statics.CreateShift = function(_id  , _date,_timeStart , _timeDuration) {
    return new Promise(((resolve, reject) => {
        new this({
            id :_id,
            date: _date,
            timeStart: _timeStart,
            timeDuration: _timeDuration
        }).save((err, data) => {
            if (err) {
                reject(err);
            }

            resolve('success');

        });
    }))
};

// delete shift
shiftSchema.statics.RemoveShift = function (_id){
    return new Promise((resolve, reject) => {
        this.findOneAndDelete({id:_id},function (err,shift) {
            if (err) reject(err);
            if (!shift) reject('can not find');
            resolve('success remove  shift');
        })
    })
};

// update shift , find shift

// push shifts to exam
shiftSchema.statics.PushShift2Exam = function(_idShift, _idExam){
    return new Promise (((resolve, reject) => {

        this.findOne({id:_idShift}).then((_shift,err)=>{
            if (err) reject(err) ;

            if (!shift) reject('can not find');
            else{
                const otp = { runValidators: true,new:true};
                exam.updateOne({id:_idExam},{$addToSet:{shift:_shift}},otp,function (err) {
                    if (err) reject(err);
                    resolve('success push shift to exam');

                })
            }
        })
    }))
};

// push shifts to exam  // co dc dung lai
shiftSchema.statics.PullShift2Exam = function(_idShift, _idExam){
    return new Promise (((resolve, reject) => {
        this.findOneAndDelete({id:_idShift}).then((_shift,err)=>{
            if (err) reject(err) ;

            if (!shift) reject('can not find');
            else{
                const otp = { runValidators: true,new:true};
                exam.updateOne({id:_idExam},{$pull:{shift:_shift}},otp,function (err) {
                    if (err) reject(err);
                    resolve('success pull shift to exam');

                })
            }
        })

    }))
};
const shift = mongoose.model('Shift', shiftSchema);

module.exports= shift ;