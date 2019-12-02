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
    console.log(req);
    //  xu li du lieu o day ?
    let  userId = req.query.id ;
    let  userName =  req.query.name ;
    let  userEmail =  req.query.email ;
    let  userPassword =  req.query.password ;

    let newuser = new user();
    newuser.NewUser(userId,userName,userEmail,userPassword);
    res.send(newuser);
}

// find an user by id
// get , post : create
adminController.findUserByID = function(req, res) {
    //console.log(req);
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

            res.send('Update success' + updateUser)
    });
};

// Delete an user
adminController.deleteUser = function(req, res) {
    //{_id: req.params.id} // user not exist ?
    user.findOneAndDelete({ id : req.query.id },  function(err,deleteUser) {
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
    course.find({ idCourse:req.params.idCourse ,idClass: req.params.idClass }).exec(function (err, course) {
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


    course.findOneAndUpdate( {idCourse : req.params.idCourse , idClass: req.params.idClass },
                    { $set: { nameCourse: req.body.nameCourse , lecturer :req.params.lecturer , num: req.params.num }},
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
    course.findOneAndDelete({ idCourse : req.params.idCourse , idClass: req.params.idClass}, function(err,deleteCourse) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Course deleted!");
            //res.redirect("/employees");
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

    // create new course
    let newCourse = new course();
    newCourse.NewCourse('aaa','abc','DucLam',"mr lam", 1) ;


    //create new room 1
    let newRoom = new room();
    newRoom.NewRoom('102a','gd2',20,'used');

    //create new room 2
    let newRoom2 = new room();
    newRoom2.NewRoom('303a','gd4',20,'used');

    // create rooms
    let rooms = [] ;
    rooms.push(newRoom);
    rooms.push(newRoom2);

    // tao ca thi
    let subExam = new  subexam();
    subExam.NewSubExam('mon toan xac xuat',rooms, newCourse,  '7h:00','30 minutes');

    //
    let subExams = [];
    subExams.push(subExam);

    let exam1  = new exam();
    exam1.NewExam('Final Semester', subExams);

    res.send(exam1);



}

// find exam
adminController.findExamById = function(req, res) {
    //{_id: req.params.id}
    exam.findOne({ name: 'Final Semester'})

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
    exam.findOneAndDelete({ id :'Final Exam'}, function(err,data) {
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

