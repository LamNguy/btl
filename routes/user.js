var express = require('express');
var router = express.Router();

var userController = require('../appserver/controller/userController');
const authController = require('../appserver/controller/authController')


/* GET home page. */
//router.get('/', authController.verifyToken, authController.checkStudentToken);


router.get('/show',userController.listExam);
router.get('/enroll',userController.enrollExam);
router.get('/print',userController.printEnrollment);
router.get('/unenroll',userController.unEnrollment);

//============================session========================


module.exports = router;
