const service = require('../service/uploadFileService');
const uploadFileController = {};

// import database : room , user ,
uploadFileController.importDb = function(req,res){
    service.importDB(req.file.filename).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

uploadFileController.updateStudentQualified = function(req,res){
    service.updateStudentQualified(req.file.filename).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

uploadFileController.updateStudentUnQualified = function(req,res){

   service.updateStudentUnQualified(req.file.filename).then(response=>{
       res.send(response);
   }).catch(err=>{
       res.send(err);
   })


}



module.exports = uploadFileController;