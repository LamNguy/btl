let async = require('async');
let uniqueValidator = require('mongoose-unique-validator');
let arrayUniquePlugin = require('mongoose-unique-array');
let validator = require('../validator/validatetor');
let message = require('../config/message');
const exam = require('../models/exam');
//const room = require('../models/room');
const mongoose = require('mongoose');
const course = require('../models/course');
const room = require('../models/room');
const Schema = mongoose.Schema ;


/*
 *  TODO: Define shift schema
 */


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
        ,ref:'Room'
        //unique: true,
          //  index : true,
          //  default : undefined

    }],

    course : {

        type : Schema.Types.ObjectId
        ,ref :'Course'
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


/*
 *  TODO: Define shift schema methods
 */

// find
shiftSchema.statics.FindShift = function(_id){
    return new Promise(((resolve, reject) => {
        this.find({id:_id}).exec(function (err,shift) {
            if (err) reject(err);
            if (!shift) reject('can not find');

            resolve(shift)
        })
    }))
};

// list
shiftSchema.statics.ListShift = function(){
    return new Promise(((resolve, reject) => {
        this.find({})
            .populate({
                path: "room course"
            })
            .then(shifts=>{
            resolve(shifts);
        }).catch(err=>{
            reject(err);
        })
    }))
};

// create
shiftSchema.statics.CreateShift = function(data) {

    return new Promise(((resolve, reject) => {
        new this({
            id :data._id,
            date: data._date,
            status : data._status,
            timeStart: data._timeStart,
            timeDuration: data._timeDuration
        }).save()
            .then(_shift=>{

                    const otp = {runValidators: true, context: 'query', new: true};
                    if (data._rooms && data._rooms.length){

                        room.find({idRoom:{$in:data._rooms}}).then(results=>{

                            async.each(results,(object)=>{

                                if (object.status === 'used'){

                                } else {
                                    room.updateOne({idRoom:object.idRoom},{$set:{status:"used"}},otp).then(resolve=>{
                                        this.updateOne({id:_shift.id},{$push:{room:object._id}},otp).then(a=>{

                                        }).catch(e=>{
                                            console.log(e);
                                        })
                                    }).catch(e=>{
                                        console.log(e);
                                    })



                                }


                            })

                        }).catch(err=>{

                            reject(err);
                        })

                    }



                    if (data._course){
                        course.findOne({id:data._course}).then(_course=>{

                            this.updateOne({id:_shift.id},{$set : { course :_course._id}},otp,(err,result)=>{

                                if (err) reject (err);

                            });
                        }).catch(err=>{
                            reject (err);
                        })
                    }

                    resolve('success');

            }

            ).catch(err=>{

                reject (err);
            })
    }))
};

// delete
shiftSchema.statics.RemoveShift = function (_id){
    return new Promise((resolve, reject) => {
        this.findOneAndDelete({id:_id},function (err,shift) {
            if (err) reject(err);
            if (!shift) reject('can not find');
            resolve('success remove  shift');
        })
    })
};

// update

// push2exam
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

/*
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
*/

const shift = mongoose.model('Shift', shiftSchema);

module.exports= shift ;