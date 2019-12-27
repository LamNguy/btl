let uniqueValidator = require('mongoose-unique-validator');
let arrayUniquePlugin = require('mongoose-unique-array');
let validator = require('../validator/validatetor');
//const shift = require('../models/shift');
let message = require('../config/message');
const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

/*
 *   TODO: Define course schema
 */


let courseSchema = new Schema ({

    id :  {
        type :String,
        required : [true, message.canNotBlank],
        maxlength : 10 ,
        trim : true,
        unique : true ,
        index  : true
    },

    name :  {
        type : String ,
        required : [true ,  message.canNotBlank],
        trim : true,
        maxlength: 30
    },

    lecturer : {
        type: String ,
        required : [true,message.canNotBlank],
        trim : true ,
        maxlength : 30 ,
        minlength : 5 ,
        validate : [validator.validateName, message.invalidName],

    },

    num : {
        type : Number ,
        required : [true,message.canNotBlank],
        min : 1 ,
        max : 4
    }

},{collection:'course'});

courseSchema.plugin(uniqueValidator,{message:'Duplicated object !'});
courseSchema.plugin(arrayUniquePlugin,{message:"Duplicated  array"});



/*
 * TODO : Define course schema methods
 */


// list course
courseSchema.statics.ListCourse = function(){
    return new  Promise((resolve ,reject)=>{
        this.find({}).exec(function (err,courses) {
            if ( err) {
                reject(err);
            }

            resolve(courses);
        })
    })
};

// create course
courseSchema.statics.CreateNewCourse = function ( _id, _name , _lecturer , _num ){

   return new  Promise((resolve ,reject)=>{
       new this({
           id : _id ,
           name : _name ,
           lecturer :  _lecturer,
           num :  _num
       }).save((err) => {
           if (err) {
               reject(err);
           }

          resolve(message.Success);
       });
   })
};

// update course  @@@@@@
courseSchema.statics.UpdateCourse = function(update){
    return new  Promise((resolve ,reject)=>{
        const otp = { runValidators: true,context : 'query',new:true};
        this.updateOne({id : update._id},{ $set: { name: update._name , lecturer : update._lecturer, num : update._num }},
            otp, function (err) {
                if (err) {
                    reject(err);
                }

                resolve(message.Success);
            });
    })
};

// delete course
courseSchema.statics.RemoveCourse = function(_id){
    return new Promise(((resolve, reject) => {
        this.findOneAndDelete({id:_id},function (err,course) {
            if ( err ) reject(err);
            if ( !course ) reject(message.canNotFound);

            resolve(message.Success);
        })
    }))
};

// find course
courseSchema.statics.FindCourseByID = function(_id){
    return new  Promise(((resolve, reject) => {
        this.findOne({id:_id}, function (err, course) {
            if ( err) {
                reject(err);
            }
            if ( ! course ) reject(message.canNotFound);

            resolve(course);
        })
    }))
};

/*
// add course to shift
courseSchema.statics.PushCourse2Shift =  function(_idCourse, _idShift){
    return new Promise(((resolve, reject) => {
        this.findOne({id:_idCourse}).then((data,err)=>{
            if (err) reject(err);
            if ( !data ) reject('can not find course');
            else {

                shift.updateOne({id:_idShift}, {$set : { course :data}},function (err) {
                    if ( err) reject(err);
                    resolve(message.Success);
                })
            }
        })
    }))
};

// remove course from shift
courseSchema.statics.PullCourse2Shift =  function(_idCourse, _idShift){
    return new Promise(((resolve, reject) => {
        this.findOneAndDelete({id:_idCourse}).then((data,err)=>{
            if (err) reject(err);
            if ( !data ) reject('can not find course');
            else {

                shift.updateOne({id:_idShift}, {$unset : { course :data}},function (err) {
                    if ( err) reject(err);
                    resolve(message.Success);
                })
            }
        })
    }))
};

*/

const course = mongoose.model('Course', courseSchema);

module.exports =  course ;
