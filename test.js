// Import the top-level function of express
const express = require('express');
const adminController = require('../web/appserver/controller/adminController');
// Creates an Express application using the top-/level function
const app = express();
// Define port number as 3000
const port = 3000;
// Routes HTTP GET requests to the specified path "/" with the specified callback function

var adminRouter = require('../web/routes/admin');
var mongoose = require('mongoose') ;
let bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:  true}));

let connections = require('../web/appserver/config/database')
mongoose.connect(connections.url , {useNewUrlParser: true} ,{ useFindAndModify: false }) ;
var router = require('../web/routes/index');


app.put('/lam', function(req, res) {


    //adminController.listUser(req,res);
    //adminController.createNewUser(req,res);
   // adminController.findUserByID(req,res);
    adminController.updateUser(req,res);
   // adminController.deleteUser(req,res);
    //adminController.listCourse(req,res)
    //adminController.createNewCourse(req,res);

    //adminController.listExam(req,res);
    //adminController.findExamById(req,res);
    //adminController.deleteExam(req, res);
    // adminController.findExamById(req,res);
    //adminController.createNewExam(req, res);
    //adminController.listExam(req, res);
});

app.use('/admin', adminRouter);

// Make the app listen on port 3000
app.listen(port, function() {
    console.log('Server listening on http://localhost:' + port);
})
