let mongoose = require('mongoose');
const Schema = mongoose.Schema ;
let courseSchema = new Schema ({

    id        :  String,
    nameCourse:  String,
    nameClass :  String
},{collection:'course'});

let course = mongoose.model('Course', courseSchema);

module.exports =  course ;
