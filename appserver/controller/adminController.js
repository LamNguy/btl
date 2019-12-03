const  user = require('../models/user')
const  course = require('../models/course');
const  exam = require('../models/exam');
const  room = require('../models/room');
const  subexam = require('../models/disciplines');
// creates somethings as a class including functions and exports its module
const adminController = {} ;


/*
 *
 * Admin Controller
 *
 */

// k hieu req.params , req.body , red.query ?
// show list of users

//get
adminController.listUser =  function (req, res) {

    user.find({}).exec(function(err,users){
        if (err) {
            console.log('Error: ' , err);
        }
        else {
            console.log('Success'); // render view here
            res.send(users);
        }
    });
}

// when send request for create --> redirect to view create and save ?
// create new user
adminController.createNewUser = function ( req ,res){
    console.log(req.body)
    //  xu li du lieu o day ?
    let  userId = req.body.id ;
    let  userName =  req.body.name ;
    let  userEmail =  req.body.email ;
    let  userPassword =  req.body.password ;

    let newuser = new user();
    newuser.NewUser(userId,userName,userEmail,userPassword);
    res.send(newuser);
}

// find an user by id
// get , post : create
adminController.findUserByID = function(req, res) {
    console.log(req.body);
    user.find({ id : req.body.id }).exec(function (err, user) {
        if (err) {
            console.log("Error:", err);
        }
        else {
           // res.render(...) ?
            res.send(user);
        }
    });
};

// redirect to view  update and update only
// Update an user
adminController.updateUser = function(req, res) {
    console.log(req);

    user.findOneAndUpdate( {id :  req.body.id }, { $set: { name: req.body.name , email:req.body.email , password: req.body.password }},
        { new: true }, function (err, updateUser ) {
            if (err) {
                console.log(err);
            }

            if (updateUser == null ) res.send('user not exists');
            res.send('Update success' + updateUser);
    });
};

// Delete an user
adminController.deleteUser = function(req, res) {
    //{_id: req.params.id} // user not exist ?
    user.findOneAndDelete({ id : req.body.id },  function(err,deleteUser) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Employee deleted!");
            //res.redirect("/employees");
            res.send('Deleted' + deleteUser);
        }
    });
};

/*
 *
 * Course Controller
 *
 */


// show list course
adminController.listCourse =  function (req, res) {

    course.find({}).exec(function(err,courses){
        if (err) {
            console.log('Error: ' , err);
        }
        else {
            console.log('Success'); // render view here
            res.send(courses);
        }
    });
}

// create new course
adminController.createNewCourse = function ( req ,res){

    let  _idCourse = req.body.idCourse ;
    let  _idClass  = req.body.idClass ;
    let  _nameCourse = req.body.nameCourse;
    let  _lecturer = req.body.lecturer ;
    let  _numOfCredit  = req.body.num ;

   let newCourse =  new course();
   newCourse.NewCourse(_idCourse, _idClass , _nameCourse , _lecturer , _numOfCredit)

}

// find an course by idCourse and idClass
adminController.findCourseById = function(req, res) {
    //{_id: req.params.id}
    course.find({ idCourse:req.body.idCourse ,idClass: req.body.idClass }).exec(function (err, course) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            // res.render("../views/employees/show", {employee: employee});
            res.send(course);
        }
    });
};

// Update an course ( update nameCourse , lecturer , numOfCredit)
adminController.updateCourse = function(req, res) {


    course.findOneAndUpdate( {idCourse : req.body.idCourse , idClass: req.body.idClass },
                    { $set: { nameCourse: req.body.nameCourse , lecturer :req.body.lecturer , num: req.body.num }},
        { new: true }, function (err, updateCourse) {
            if (err) {
                console.log(err);
            }

            res.send(updateCourse)
        });
};

// delete course
adminController.deleteCourse = function(req, res) {
    //{_id: req.params.id} // user not exist ?
    console.log(req.body);
    course.findOneAndDelete({ idCourse : req.body.idCourse , idClass : req.body.idClass }, function(err,deleteCourse) {
        if(err) {
            console.log(err);
        }
        else {
            if (deleteCourse == null ) res.send("can not delete");
            console.log("Course deleted!");
            //res.redirect("/course");
            res.send(deleteCourse);
        }
    });
};


/*
 *   Enroll course
 */

// show list of
adminController.listExam =  function (req, res) {

    exam.find({})
        .populate({
            path: 'subExams',
            populate: [{
                path : 'room'
            }, {
                path : 'course'
            }]
        })
        .exec(function(err,listExam){
        if (err) {
            console.log('Error: ' , err);
        }
        else {
            console.log('Success'); // render view here
            res.send(listExam);
        }
    });
}

// create new user
adminController.createNewExam = function ( req ,res){

    // get data from req ?

    let subExams = [];

    req.body.subExams.forEach(e=>{
        // create new course
        let newCourse = new course();
        newCourse.NewCourse(e.course.idCourse,e.course.idClass
            ,e.nameCourse,e.course.lecturer , e.course.num) ;

        let rooms = [] ;

        e.room.forEach(e1=>{
            let newRoom = new room();
            newRoom.NewRoom(e1.idRoom , e1.auditorium, e1.slots,e1.status);
            rooms.push(newRoom);
        })

        // tao ca thi
        let subExam = new  subexam();
        subExam.NewSubExam(e.id, rooms , newCourse,  e.date,e.timeStart);

        subExams.push(subExam);


    });

    let exam = new exam();
    exam.NewExam(req.body.name, subExams);
    res.send(exam);



};

// find exam
adminController.findExamById = function(req, res) {
    //{_id: req.params.id}
    exam.findOne({ name: req.body.name})
        .populate({
            path: 'subExams',
            populate: [{
                path : 'room'
            }, {
                path : 'course'
            }]
        })
            .exec(function (err, data) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            // res.render("../views/employees/show", {employee: employee});
            console.log(data);
            res.send(data);
        }
    });
};

// delete
adminController.deleteExam = function(req, res) {
    //{_id: req.params.id} // user not exist ?
    exam.findOneAndDelete({ name :req.body.name }, function(err,data) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("exam deleted!");
            //res.redirect("/employees");
            res.send(data);
        }
    });
};

// update
adminController.updateExam = function(req, res) {

    // can update each object ??
};


adminController.printExam = function (req,res){
    // how to in
}

// export
module.exports = adminController ;

