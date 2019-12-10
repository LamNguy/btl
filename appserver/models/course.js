const shift = require('../models/shift');
const message = require('../config/message')
let uniqueValidator = require('mongoose-unique-validator');
let mongoose = require('mongoose');
const Schema = mongoose.Schema ;



let courseSchema = new Schema ({

    id :  {
        type :String,
        unique : true ,
        trim : true,
        //validate : [_validator.validateId, message.invalidId],
        required : [true, message.canNotBlank],
        index  : true    },


    name :  {
        type : String ,
        require : true ,
        trim : true ,
    },
    lecturer     :  {
        type : String ,
        require : true ,
        trim :true ,

    },
    num : {
        type : Number ,
        require : true ,
        min : 1 ,
        max : 4
    }

},{collection:'course'});

// list course
courseSchema.statics.ListCourse = function( callback){
    this.find({}).exec(function (err,data) {
        if ( err) {
            callback(err,null);
        }
        else callback(null, data)
    })
}

// create new course
courseSchema.statics.CreateNewCourse = function ( _id, _name , _lecturer , _num , callback){

    new this({
        id : _id ,
        name : _name ,
        lecturer :  _lecturer,
        num :  _num
    }).save((err,data) => {
        if (err) {
            callback(err,null);
        }
        else{
            callback(null,data);
        }

    });

};

// update user
courseSchema.statics.UpdateCourse = function(update, callback){
    this.findOneAndUpdate({id : update._id},{ $set: { name: update._name , lecturer : update._lecturer, num : update._num }},
        { new: true }, function (err, data ) {
            if (err) {
                callback(err,null)
            }
            else callback(null,data)

        });
};

// delete user
courseSchema.statics.RemoveCourse = function(_id,callback){
    this.findOneAndRemove({id:_id},function (err,data) {
        if ( err ) callback(err,null) ;
        else callback(null, data);
    })
};

// find user by id
courseSchema.statics.FindCourseByID = function(_id , callback ){
    this.findOne({id:_id}, function (err, data) {
        if ( err) {
            callback(err, null);
        }
        else callback(null, data);
    })
};

// add course to shift
courseSchema.statics.PushCourse2Shift =  function(_idCourse, _idShift,callback){
    this.findOne({id:_idCourse}).exec((err,data)=>{
        if (err) callback(err,null)
        else {
            shift.findOneAndUpdate({id:_idShift}, {$set : { course :data}},function (err,data2) {
                if ( err) callback(err,null);
                else callback(null, data2)});
        }
    })
};



let course = mongoose.model('Course', courseSchema);
module.exports =  course ;
