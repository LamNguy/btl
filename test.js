// Import the top-level function of express
const express = require('express');
//const adminController = require('./appserver/controller/adminController');
//const authController = require('./appserver/controller/authController');
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
//const jwt = require('jsonwebtoken')
//const fileStore = require('session-file-store')(session);
//db config
let connections = require('./appserver/config/database');

//passport config


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:  true}));
app.use(cors());

//express session
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

mongoose.connect(connections.mongoURI, connections.mongoCFG)
  .then(success=>{
    console.log('Connect to mongodb successfully')
  }).catch(err=>{
    console.log('Can not connect to mongodb : ' + err);
});


app.use('/', adminRouter);
app.use ('/', userRouter);
app.use('/login', indexRouter);
app.get('/home', (req, res) => {
  res.send(`hello`);
})


// Make the app listen on port 5000
app.listen(port, function() {
    console.log('Server listening on http://localhost:' + port);
})
