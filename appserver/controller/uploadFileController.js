/*
 *  TODO : Upload file controller activities
 */

const service = require('../service/uploadFileService');
const uploadFileController = {};

// todo: import databases
uploadFileController.importDb = function(req,res){
    service.importDB(req.file.filename).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// todo: import qualified students
uploadFileController.updateStudentQualified = function(req,res){
    service.updateStudentQualified(req.file.filename).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// todo import not qualified students
uploadFileController.updateStudentUnQualified = function(req,res){

   service.updateStudentUnQualified(req.file.filename).then(response=>{
       res.send(response);
   }).catch(err=>{
       res.send(err);
   })
}

uploadFileController.updateAuth = (req, res) => {
  service.updateAuth(req.file.filename)
    .then(response => {
      res.send(response);
    }).catch(err => {
      res.send(err);
    })
}


module.exports = uploadFileController;
