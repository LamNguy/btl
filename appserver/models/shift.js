let  mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let arrayUniquePlugin = require('mongoose-unique-array');
let validator = require('../validator/validatetor');
let message = require('../config/message');
//const exam = require('../models/exam');
//const room = require('../models/room');
//const course = require('../models/course');

const  Schema = mongoose.Schema ;



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
        this.find({}).then(shifts=>{
            resolve(shifts);
        }).catch(err=>{
            reject(err);
        })
    }))
};

/*
// create shift
shiftSchema.statics.CreateShift = function(data) {

    return new Promise(((resolve, reject) => {
        new this({
            id :data._id,
            date: data._date,
            timeStart: data._timeStart,
            timeDuration: data._timeDuration
        }).save()
            .then((_shift)=>{

                    const otp = {runValidators: true, context: 'query', new: true};
                    if (data._rooms && data._rooms.length){

                        room.find({idRoom:{$in:data._rooms}}).then(results=>{
                            console.log(results);
                        }).catch(err1=>{

                            reject(err1)
                        })

                    }



                    if (data._course){
                        course.findOne({id:data._course}).then(_course=>{

                            this.updateOne({id:_shift.id},{$set : { course :_course._id}},otp,(err,result)=>{
                                console.log(result);
                                console.log(err);
                                if (err) reject (err);

                            });
                        }).catch(err=>{
                            reject (err);
                        })
                    }

                    resolve('success');

            }

            ).catch(err=>{
                console.log(err);
                reject (err);
            })
    }))
};
*/
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
/*
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

 */
const shift = mongoose.model('Shift', shiftSchema);

module.exports= shift ;