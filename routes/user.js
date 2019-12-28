var express = require('express');
var router = express.Router();

var userController = require('../appserver/controller/userController');
const authController = require('../appserver/controller/authController')


/* GET home page. */
//router.get('/', authController.verifyToken, authController.checkStudentToken);


router.get('/show',userController.listExam);
router.post('/enroll',userController.enrollExam);
router.get('/print',userController.printEnrollment);
router.post('/unenroll',userController.unEnrollment);

//============================session========================


module.exports = router;
