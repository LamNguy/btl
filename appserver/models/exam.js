let  mongoose = require('mongoose');
const  Schema = mongoose.Schema ;


let examSchema = new Schema({
    name        : String,
    subExams 	: [{ type : Schema.Types.ObjectId  , ref:'SubExam' }] ,

},{collection:'exam'});

examSchema.methods.NewExam = function( _name , _subExams){
    this.name = _name ;
    this.subExams= _subExams ;

    this.save((err)=>{
        if ( err) console.log(err);
        else  console.log('success');
    })

}



let exam = mongoose.model('Exam', examSchema);

module.exports= exam ;