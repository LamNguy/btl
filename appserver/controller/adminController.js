const  user = require('../models/user');
const  course = require('../models/course');
const  exam = require('../models/exam');
const  room = require('../models/room');
const  shift = require('../models/shift');
// creates somethings as a class including functions and exports its modules
const adminController = {} ;


/*
 *
 * Admin Controller
 *
 */

// list users
adminController.listUser =  function (req, res) {

    user.ListUser().then((response)=>{
        res.send(response);
    }).catch((err)=>{
        res.send(err)
    })
};

// create new user
adminController.createNewUser = function ( req ,res){
    // trim middle ?
    let  userId    =   req.body.id ;
    let  userName  =   req.body.name ;
    let  userEmail =   req.body.email  ;

    user.CreateNewUser(userId,userName,userEmail).then((response)=>{
        res.send(response);
    }).catch(err=>{
        res.send(err.message);
    })

};

// find an user
adminController.findUserByID = function(req, res) {
    console.log(req);
    user.FindUserByID(req.params.id).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })

};

// update an user
adminController.updateUser = function(req, res) {
    let data ={};
    data._id = req.params.id ;
    data._name = req.body.name ;
    data._email = req.body.email ;
    user.UpdateUser(data).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err.message);
    });
};

// delete an user
adminController.deleteUser = function(req, res) {
    user.RemoveUser(req.params.id).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })

};

/*
 *
 * Course Controller
 *
 */

// show course
adminController.listCourse =  function (req, res) {

    course.ListCourse().then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// create course
adminController.createNewCourse = function ( req ,res){

    let  _idCourse = req.body.id ;
    let  _nameCourse = req.body.name;
    let  _lecturer = req.body.lecturer ;
    let  _numOfCredit  = req.body.num ;

    course.CreateNewCourse(_idCourse,_nameCourse,_lecturer,_numOfCredit).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// find course
adminController.findCourseById = function(req, res) {
    course.FindCourseByID(req.params.id).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// update course
adminController.updateCourse = function(req, res) {

    let data = {};
    data._id = req.params.id ;
    data._name = req.body.name ;
    data._lecturer = req.body.lecturer ;
    data._num = req.body.num ;
    course.UpdateCourse(data).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// delete course
adminController.deleteCourse = function(req, res) {

    course.RemoveCourse(req.params.id).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// add course to shift
adminController.pushCourse2Shift = function(req,res){

    course.PushCourse2Shift(req.body.idCourse,req.body.idShift).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// remove course from shift
adminController.removeCourseFromShift =  function(req,res){

    course.PullCourse2Shift(req.body.idCourse,req.body.idShift).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};


/*
 *   Shift controller
 */

// find shift
adminController.findShiftById = function(req,res){
    shift.FindShift(req.params.id).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// delete shift
adminController.removeShift = function(req,res){
    shift.RemoveShift(req.params.id).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// update shift @@@@@
adminController.updateShift = function(req,res){
    let data =  {};
    data.id = req.params.id ;
    data.date = req.body.date;
    data.timeStart  = req.body.timeStart ;
    data.timeDuration = req.body.timeDuration;
};

// list shift
adminController.listShift = function(req,res){
    shift.ListShift().then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// create shift
adminController.createShift = function(req,res){

    let data = {};
    data._id = req.body.id;
    data._date = req.body.date;
    data._timeStart = req.body.timeStart ;
    data._timeDuration = req.body.timeDuration ;
    data._status = req.body.status;

    data._rooms = req.body.room;
    data._course = req.body.course;

    shift.CreateShift(data).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// push shift to exam
adminController.pushShift2Exam = function(req,res){
    shift.PushShift2Exam(req.body.idShift,req.body.idExam).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};


/*
 *  Exam controller
 */

//create
adminController.createExam = function(req ,res){
    exam.CreateNewExam(req.body.id,req.body.name).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })

};

//list
adminController.printShift = function(req,res) {
    exam.PrintShifts(req.body.id).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// update

// delete

// find


/*
 *  Room controller
 */

// show course
adminController.listRoom =  function (req, res) {
    room.ListRoom().then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// create course
adminController.createNewRoom = function ( req ,res){

    let  _id = req.body.idRoom ;
    let  _name = req.body.name;
    let  _slots = req.body.slots ;
    let  _status  = req.body.status ;

    room.CreateNewRoom(_id,_name,_slots,_status).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// find course
adminController.findRoomById = function(req, res) {
    room.FindRoomByID(req.params.id).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// update course
adminController.updateRoom = function(req, res) {

    let data = {};
    data._id = req.params.id ;
    data._name = req.body.name ;
    data._slots = req.body.slots ;
    data._status = req.body.status ;
    room.UpdateRoom(data).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};

// delete course
adminController.deleteRoom = function(req, res) {

    room.RemoveRoom(req.params.id).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    })
};


module.exports = adminController ;
