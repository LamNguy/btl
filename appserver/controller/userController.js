/*
 *  TODO: Student controller activities
 */

const  user = require('../models/user');
const exam = require('../models/exam');
const userController = {} ;


// todo: list exam
userController.listExam = function (req, res) {
    exam.PrintSchedules(req.body.id).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// todo: enroll exam
userController.enrollExam = function (req, res) {
    let _idUser = req.body.idUser ;
    let _idExam = req.body.idExam ;
    let _idShift = req.body.idShift ;
    let _idRoom = req.body.idRoom ;
   // let _idCourse = req.body.idCourse ;
    user.Enroll(_idUser , _idExam,_idShift,_idRoom).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// todo: print enrollment
userController.printEnrollment = function (req,  res) {

    user.PrintEnrollment(req.body.id).then(response=>{

        res.send(response);
    }).catch(err=>{
      res.send(err);
    })


};

// todo: undo enrollment
userController.unEnrollment = function(req,res){
    let _idUser = req.body.idUser ;
    let _idExam = req.body.idExam ;
    let _idShift = req.body.idShift ;
    let _idRoom = req.body.idRoom ;
    let _idCourse = req.body.idCourse ;

    user.UnEnroll(_idUser,_idExam,_idShift,_idRoom,_idCourse).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

module.exports = userController ;

