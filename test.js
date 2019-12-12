// Import the top-level function of express
const express = require('express');
const adminController = require('./appserver/controller/adminController');
const authController = require('./appserver/controller/authController');
// Creates an Express application using the top-/level function
const app = express();
// Define port number as 3000
const port = 5000;
const cors = require('cors')
// Routes HTTP GET requests to the specified path "/" with the specified callback function
var userRouter = require('./routes/user')
var adminRouter = require('./routes/admin');
var indexRouter = require('./routes/index')
var mongoose = require('mongoose') ;
let bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
require('./appserver/config/passport')(passport);
const jwt = require('jsonwebtoken')
//const fileStore = require('session-file-store')(session);
//db config
let connections = require('./appserver/config/database');

//passport config


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:  true}));
app.use(cors());

//epress session
app.use(session({
  //store: new fileStore,
  name: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    sameSite: true,
  }
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
});
*/
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
app.use ('/user', userRouter);
app.use('/index', indexRouter);
app.get('/home', (req, res) => {
  res.send(`hello`);
})


// Make the app listen on port 3000
app.listen(port, function() {
    console.log('Server listening on http://localhost:' + port);
})
