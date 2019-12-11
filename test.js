// Import the top-level function of express
const express = require('express');
const adminController = require('./appserver/controller/adminController');
// Creates an Express application using the top-/level function
const app = express();
// Define port number as 3000
const port = 5000;
// Routes HTTP GET requests to the specified path "/" with the specified callback function
var userRouter = require('./routes/user')
var adminRouter = require('./routes/admin');
var mongoose = require('mongoose') ;
let bodyParser = require('body-parser')
let connections = require('./appserver/config/database');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:  true}));
const subExam = require('./appserver/models/shift');
mongoose.connect(connections.mongoURI, connections.mongoCFG)
  .then(console.log('mongodb connected! ..'));
var router = require('./routes/index');

const room = require('./appserver/models/room');
const validator = require('./appserver/validator/freshData');

//let data1 = "    Nguyen      Duc Lam ";
//console.log(validator.freshData(data1));

app.use('/auth', function (req,res) {



});

app.use('/lam', function(req, res) {


    //adminController.listUser(req,res);
 //   adminController.createNewUser(req,res);
   // adminController.findUserByID(req,res);

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
app.use ('/user',userRouter);
// Make the app listen on port 3000
app.listen(port, function() {
    console.log('Server listening on http://localhost:' + port);
})
