const  user = require('../models/user')
const  course = require('../models/course');
const  exam = require('../models/exam');
const  room = require('../models/room');
const  mongoose = require('mongoose');
// creates somethings as a class including functions and exports its module
const adminController = {} ;


/*
 *
 * User Controller
 *
 */


// show list of users
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
    // let newUser = new user ( req.body )

    let newUser = new user(
        {
            id :  '17021231' ,
            name: 'Nguyen Duc Lam' ,
            email  :  '@vnu.edu.vn' ,
            password :'acx3gaf'
        }
    );


    // save, check if has exists ?
    newUser.save((err) => {
        if (err) {
                console.log("error");
                res.send(err);
        }
        else{
            res.send(newUser);
        }

    });

}

// find an user by id
adminController.findUserByID = function(req, res) {
    //{_id: req.params.id}
    user.find({ email: '@vnu.edu.vn'}).exec(function (err, employee) {
        if (err) {
            console.log("Error:", err);
        }
        else {
           // res.render("../views/employees/show", {employee: employee});
            res.send(employee);
        }
    });
};

// redirect to view  update and update only
// Update an employee
adminController.updateUser = function(req, res) {
    /*
    user.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }},
                                          { new: true }, function (err, employee) {
        if (err) {
            console.log(err);
            //res.render("../views/employees/edit", {employee: req.body});
        }
       // res.redirect("/employees/show/"+employee._id);

    }); */


    user.findOneAndUpdate( {id:'17021231'}, { $set: { name: 'update', email:'update',password:'update' }},
        { new: true }, function (err, employee) {
            if (err) {
                console.log(err);
            }

            res.send(employee)
    });
};

// Delete an employee
adminController.deleteUser = function(req, res) {
    //{_id: req.params.id} // user not exist ?
    user.findOneAndDelete({ id :'17021231'}, function(err,deleteUser) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Employee deleted!");
            //res.redirect("/employees");
            res.send(deleteUser);
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

// create new user
adminController.createNewCourse = function ( req ,res){
    // let newUser = new user ( req.body )
    let newCourse = new course(
        {
            id :  'INT1702 2019',
            nameCourse: 'INT1702' ,
            nameClass : 'Lap Trinh Web Python'
        }
    );

    // save, check if has exists ?
    newCourse.save((err) => {
        if (err) {
            console.log("error");
        }
        else{
            res.send(newCourse);
        }

    });

}

// find an user by id
adminController.findCourseById = function(req, res) {
    //{_id: req.params.id}
    course.find({ id: 'INT1702 2019'}).exec(function (err, course) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            // res.render("../views/employees/show", {employee: employee});
            res.send(course);
        }
    });
};

// Update an employee
adminController.updateCourse = function(req, res) {
    /*
    user.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }},
                                          { new: true }, function (err, employee) {
        if (err) {
            console.log(err);
            //res.render("../views/employees/edit", {employee: req.body});
        }
       // res.redirect("/employees/show/"+employee._id);

    }); */


    course.findOneAndUpdate( {id: 'INT1702 2019'}, { $set: { nameCourse: 'update', nameClass:'update' }},
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
    course.findOneAndDelete({ id :'INT1702 2019'}, function(err,deleteCourse) {
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

// show list course
adminController.listExam =  function (req, res) {

    exam.find({})
        .populate({
            path: 'room' ,
            model : 'Room' ,
            select : 'id'
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
    // let newUser = new user ( req.body )

    let newCourse = new course  ({
        id        :  'INT1222 20',
        nameCourse:  'INT1222',
        nameClass :  'Li thuyet thong tin'
    }) ;
    newCourse.save((err) => {
        if (err) {
            console.log(err);

        }
        else{
            console.log('success');
        }

    });

    let newRoom = new room({
        id : 'PM202-GD3' ,
        // need do again
        course : newCourse,
        numberOfComputers :  30
    });

    newRoom.save((err) => {
        if (err) {
            console.log(err);

        }
        else{
            console.log('success');
        }

    });
    let newExam = new exam (
        {
            id : 'Final Exam',
            room : newRoom
        }
    );

    // save, check if has exists ?
    newExam.save((err) => {
        if (err) {
            console.log('error');
            res.send(err);
        }
        else{
            res.send(newExam);
        }

    });

}

// find exam
adminController.findExamById = function(req, res) {
    //{_id: req.params.id}
    exam.findOne({ id: 'Final Exam'})
        .populate({
            path:"room" ,
            populate: {
                path : "course",
                select : 'nameCourse'
            }
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
    /*
    user.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }},
                                          { new: true }, function (err, employee) {
        if (err) {
            console.log(err);
            //res.render("../views/employees/edit", {employee: req.body});
        }
       // res.redirect("/employees/show/"+employee._id);

    }); */
    let newCourse = new course  ({
        id        :  'INT1111 20',
        nameCourse:  'INT1222',
        nameClass :  'Li thuyet thong tin'
    }) ;
    newCourse.save((err) => {
        if (err) {
            console.log(err);

        }
        else{
            console.log('success');
        }

    });

    let newRoom = new room({
        id : 'PM202-GDqq3' ,
        // need do again
        course : newCourse,
        numberOfComputers :  3000
    });

    newRoom.save((err) => {
        if (err) {
            console.log(err);

        }
        else{
            console.log('success');
        }

    });

    exam.findOneAndUpdate( {id: 'Final Exam'}, { $set: { 'room' : newRoom }},
        { new: true }, function (err, updateCourse) {
            if (err) {
                console.log(err);
            }

            res.send(updateCourse)
        });
};



// export
module.exports = adminController ;

