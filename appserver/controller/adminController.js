const  user = require('../models/user')
const  course = require('../models/course');
const  exam = require('../models/exam');
const  room = require('../models/room');
const  shift = require('../models/shift');
const  message = require('../config/message');
const  fresher = require('../validator/freshData');
// creates somethings as a class including functions and exports its module
const adminController = {} ;


/*
 *
 * Admin Controller
 *
 */


// list users
adminController.listUser =  function (req, res) {

    // step 1 : check collection exists

    // step 2 : list
    user.ListUser(function (err,response) {
        if ( err ) res.send(err);
        if ( response && response.length ) res.send(response);  // JSON.stringify(object)
        else res.send(message.notFound);
    });
};

// create new user : post
adminController.createNewUser = function ( req ,res){

    let  userId =  req.body.id ;
    let  userName =  fresher.freshData( req.body.name );
    let  userEmail = fresher.freshData( req.body.email ) ;

    user.CreateNewUser(userId,userName,userEmail,function (err,response) {
        if (err) res.send(err.message);
        else res.send(response);
    })

    // create password ???

}

// find an user by id : get
adminController.findUserByID = function(req, res) {

    console.log(req);
    user.FindUserByID(req.body.id, function (err,data) {
        if ( err ){
            console.log(data);
        }
        else res.send(data);
    })

};

// update an user : put
adminController.updateUser = function(req, res) {
    let data ={};
    data._id = req.body.id ;
    data._name = req.body.name ;
    data._email = req.body.email ;
    user.UpdateUser(data,function (err,response) {
        if ( err) console.log(err);
        if (response == null) console.log(response);
        else res.send(response);
    })
};

// delete an user : get
adminController.deleteUser = function(req, res) {
    user.RemoveUser(req.body.id,function (err,response) {
        if ( err ) console.log(err);
        else res.send(response);
    })

};

/*
 *
 * Course Controller
 *
 */


// show list course
adminController.listCourse =  function (req, res) {

    course.ListCourse(function (err,response) {
        if ( err ) console.log(err);
        else res.send(response);
    });
};

// create new course
adminController.createNewCourse = function ( req ,res){

    let  _idCourse = req.body.id ;
    let  _nameCourse = req.body.name;
    let  _lecturer = req.body.lecturer ;
    let  _numOfCredit  = req.body.num ;

    course.CreateNewCourse(_idCourse,_nameCourse,_lecturer,_numOfCredit, function (err,response) {
        if( err) console.log(err);
        else res.send(response);
    });



};

// find an course
adminController.findCourseById = function(req, res) {
    course.FindCourseByID(req.body.id,function (err,response) {
        if ( err ) console.log(err);
        else res.send(response);
    });
};

// Update an course ( update nameCourse , lecturer , numOfCredit)
adminController.updateCourse = function(req, res) {

    let data = {};
    data._id = req.body.id ;
    data._name = req.body.name ;
    data._lecturer = req.body.lecturer ;
    data._num = req.body.num ;
    course.UpdateCourse(data,function (err,response) {
        if(err) console.log(err);
        else res.send(response);
    })
};

// delete course
adminController.deleteCourse = function(req, res) {

    course.RemoveCourse(req.body.id, function (err,response) {
        if ( err) console.log(err);
        else res.send(response);
    })
};

//
adminController.pushCourse2Shift = function(req,res){

    course.PushCourse2Shift(req.body.idCourse,req.body.idShift,function (err,response) {
        if  (err) console.log(err);
        else res.send(response);
    })
};

/*
 *   Enroll course
 */

//
adminController.listShift= function(req,res){
    shift.ListShift(function (err,response) {
        if ( err) console.log(err);
        else res.send(response);
    })
};

adminController.createShift = function(req,res){

    let _id = req.body.id;
    let _date = req.body.date;
    let _timeStart = req.body.timeStart ;
    let _timeDuration = req.body.timeDuration ;
    shift.CreateShift(_id,_date,_timeStart,_timeDuration ,function (err,response) {
        if   (err) console.log(err);
        else res.send(response );
    })
};

adminController.pushRoom2Shift=function(req,res){
    room.PushRoom2Shift(req.body.idRoom,req.body.idShift,function (err,response) {
        if (err) console.log(err);
        else res.send(response);
    })
};

adminController.createExam = function(req ,res){
    exam.CreateNewExam(req.body.id,req.body.name,function (err,data) {
        if (err)  console.log(err);
        else res.send(data);
    })
};

adminController.printShift = function(req,res) {
    exam.PrintShifts(req.body.id, function (err, data) {
        if (err) console.log(err);
        else res.send(data);
    });
};

adminController.pushShift2Exam = function(req,res){
    shift.PushShift2Exam(req.body.idShift,req.body.idExam, function (err,data) {
        if ( err) console.log(err);
        else res.send(data);
    })
};



// export
module.exports = adminController ;
