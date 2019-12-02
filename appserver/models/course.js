let mongoose = require('mongoose');
const Schema = mongoose.Schema ;
let courseSchema = new Schema ({

    idCourse     :  String,
    idClass      :  String,
    nameCourse   :  String,
    lecturer     :  String,
    num          : Number

},{collection:'course'});


courseSchema.methods.NewCourse = function ( _idCourse, _idClass , _nameCourse , _lecturer , _num){
    this.idCourse = _idCourse ;
    this.idClass = _idClass ;
    this.nameCourse = _nameCourse ;
    this.lecturer = _lecturer ;
    this.num = _num ;


    this.save((err) => {
        if (err) {
            console.log("error");
        }
        else{
            console.log('success');
        }

    });

}

let course = mongoose.model('Course', courseSchema);
module.exports =  course ;
