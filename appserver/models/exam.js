let  mongoose = require('mongoose');
const  Schema = mongoose.Schema ;


let examSchema = new Schema({
    id 	: String ,
    room  	    : { type : Schema.Types.ObjectId  , ref:'Room' } ,
    // Date        : Date,
    // timeStart   : String,
    // timeEnd     : String,

},{collection:'exam'});


let exam = mongoose.model('Exam', examSchema);

module.exports= exam ;