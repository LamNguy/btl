var express = require('express');
var router = express.Router();

var userController = require('../appserver/controller/userController');
const authController = require('../appserver/controller/authController')


/* GET home page. */
//router.get('/', authController.verifyToken, authController.checkStudentToken);
router.use(authController.verifyToken);

router.get('/show',authController.checkStudentToken, userController.listExam);
router.post('/enroll',authController.checkStudentToken, userController.enrollExam);
router.get('/print',authController.checkStudentToken, userController.printEnrollment);
router.post('/unenroll',authController.checkStudentToken, userController.unEnrollment);

//============================session========================


module.exports = router;
