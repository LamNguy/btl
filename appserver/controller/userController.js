const  user = require('../models/user');
const exam = require('../models/exam');
const userController = {} ;

userController.listExam = function (req, res) {
    exam.PrintSchedules(req.body.id, function (err, data) {
        if (err) console.log(err);
        else res.send(data);
    });
}


userController.enrollExam = function (req, res) {
    let _idUser = req.body.idUser ;
    let _idExam = req.body.idExam ;
    let _idShift = req.body.idShift ;
    let _idRoom = req.body.idRoom ;
    let _idCourse = req.body.idCourse ;
    user.Enroll(_idUser , _idExam,_idShift,_idRoom,_idCourse,function (err,response) {
        if (err) console.log(err);
        else res.send(response);
    })
}


userController.printEnrollment = function (req,  res) {
    user.PrintEnrollment(req.body.id,function (err,response) {
        if (err) console.log(err);
        else res.send(response);
    })
}




module.exports = userController ;

