let  mongoose = require('mongoose');
const  Schema = mongoose.Schema ;


let subExamSchema = new Schema({

    id 	        : String ,
    room 	    : [ { type : Schema.Types.ObjectId  , ref:'Room' }] ,
    course      : { type :Schema.Types.ObjectId , ref :'Course' }  ,
    date        : String,
    timeStart   : String,
    timeDuration: String

},{collection:'subExam'});


subExamSchema.methods.NewSubExam = function( _id , _room ,  _course , _date , _timeStart , _timeDuration){

    this.id  = _id ;
    this.room = _room ;
    this.course = _course ;
    this.date =  _date ;
    this.timeStart =  _timeStart ;
    this.timeDuration = _timeDuration ;

    this.save((err)=>{
        if (err) console.log(err);
        else console.log('success');
    })
}


let subExam = mongoose.model('SubExam', subExamSchema);

module.exports= subExam;