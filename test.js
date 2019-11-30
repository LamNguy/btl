// Import the top-level function of express
const express = require('express');
const adminController = require('../untitled1/appserver/controller/adminController');
// Creates an Express application using the top-/level function
const app = express();
// Define port number as 3000
const port = 3333;
// Routes HTTP GET requests to the specified path "/" with the specified callback function


var user = require('../untitled1/appserver/models/user');
var mongoose = require('mongoose') ;
mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true} ,{ useFindAndModify: false }) ;


app.use('/test',function (req,res) {
    res.send('success');
})

app.use('/lam', function(req, res) {
    //adminController.createNewCourse(req,res);
    adminController.findCourseById(req,res);
    //adminController.delete(req , res );
    //adminController.createNewUser(req, res);
    //adminController.findUserByID(req,res);
    //adminController.updateUser(req, res);
    //adminController.createNewExam(req,res);

    //adminController.listExam(req,res);
    //adminController.findExamById(req,res);
    //adminController.deleteExam(req, res);
    // adminController.findExamById(req,res);
    //adminController.createNewExam(req, res);
    //adminController.listExam(req, res);
});






// Make the app listen on port 3000
app.listen(port, function() {
    console.log('Server listening on http://localhost:' + port);
})
