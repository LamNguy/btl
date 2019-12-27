let arrayUniquePlugin = require('mongoose-unique-array');
let uniqueValidator = require('mongoose-unique-validator');
let message = require('../config/message');
const  mongoose = require('mongoose');
const  Schema = mongoose.Schema ;


/*
 *  TODO: Define exam schema
 */

let  examSchema = new Schema({
    id:{
        type : String ,
        required :[true,message.canNotBlank],
        trim   : true,
        maxlength: 10,
        unique : true
    },

    name : {
        type : String ,
        required : true ,
        trim : true,
        maxlength:30 ,
        minlength:5,
    },

    shift	:[{
        type : Schema.Types.ObjectId ,
        ref:'Shift' ,
      //  unique : true ,
    //    index : true ,
      //  default: undefined
    }]

},{collection:'exam'});

// create exam
examSchema.statics.CreateNewExam = function( _id, _name){
    return new Promise(((resolve, reject) => {
        new this({
            id: _id,
            name :_name,
        }).save((err)=>{
            if ( err) reject(err);
            resolve(message.Success);
        })
    }))
};

//examSchema.plugin(uniqueValidator,{message:'Duplicated object !'});
//examSchema.plugin(arrayUniquePlugin,{message:"Duplicated  array"});


/*
 *  TODO: Define exam schema methods
 */

// delete
examSchema.statics.DeleteExam = function( _id) {
    return new Promise((resolve, reject) => {
        this.findOneAndDelete({id:_id},function (err,result) {
            if (err ) reject (err);
            if ( ! result ) reject('not found');
            resolve('success remove');
        })
    });
};

// find
examSchema.statics.FindExam = function( _id) {
    return new Promise((resolve, reject) => {
        this.findOne({id:_id})
            .populate([{
                path : "shift",
                populate:{
                    path:  "room course"
                }
            }]).exec().then(response=>{
                resolve(response);
        }).catch(err=>{
            reject(err);
        })
    });
};

// create
examSchema.statics.CreateNewExam = function( _id, _name){
    return new Promise(((resolve, reject) => {
        new this({
            id: _id,
            name :_name,
        }).save((err)=>{
            if ( err) reject(err);
            resolve(message.Success);
        })
    }))
};

// todo : list shift to user or exam to user ?
examSchema.statics.PrintShifts = function ( _id ){
    return new Promise(((resolve, reject) => {
        this.find({})
            .populate([{
                path: 'shift',
                populate: {
                    path : 'room course'
                }
            }])
            .then(data=>{
                resolve(data);
            }).catch(err=>{
                reject(err);
        })
    }))
};

// list
examSchema.statics.listExam = function (){
    return new Promise(((resolve, reject) => {



        this.find({})
            .populate([{
                path: 'shift',
                populate: {
                    path : 'room course'
                }
            }])
            .then(data=>{

                resolve(data);
                

            }).catch(err=>{
            reject(err);
        })
    }))
};

// print shift @@@@@
examSchema.statics.PrintSchedules = function (_id) {
    return new Promise(((resolve, reject) => {
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
            .then((data,err)=>{
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
    }))
};

const exam = mongoose.model('Exam', examSchema);
module.exports= exam ;
