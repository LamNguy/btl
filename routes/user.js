var express = require('express');
var router = express.Router();

var userController = require('../appserver/controller/userController');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('user home page');
});


router.get('/show',userController.listExam);
router.get('/enroll',userController.enrollExam);
router.get('/print',userController.printEnrollment);

//============================session========================






module.exports = router;
