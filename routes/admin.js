const express = require('express');
const router = express.Router();
const adminController = require('../appserver/controller/adminController')
const authController = require('../appserver/controller/authController')
const jwt = require('jsonwebtoken')
/* GET home page. */

router.get('/', authController.verifyToken, authController.checkAdminToken);


// user
router.get('/user', function (req,res,next) {
    res.send('user management /list /create /find /update /delete ')
})

router.get('/user/list', adminController.listUser) ;
router.post('/user/create',adminController.createNewUser);
router.get('/user/find',adminController.findUserByID);
router.put('/user/update',adminController.updateUser);
router.get('/user/delete', adminController.deleteUser);

// course
router.get('/course', function (req, res) {
    res.send('course management /list /create /find /update /delete');
})
router.get('/course/list' , adminController.listCourse);
router.post('/course/create' , adminController.createNewCourse);
router.get('/course/find',adminController.findCourseById);
router.get('/course/delete',adminController.deleteCourse);
router.put('/course/update', adminController.updateCourse);


// room

router.get('/room', function (req, res) {
    res.send('room management /list /create /find /update /delete');
});
router.get('/room/list' , adminController.listRoom);
router.post('/room/create' , adminController.createNewRoom);
router.get('/room/find',adminController.findRoomById);
router.get('/room/delete',adminController.deleteRoom);
router.put('/room/update', adminController.updateRoom);


// shift

router.get('/shift', function (req,res,next) {
    res.send('create /list')
});


router.get('/shift/list',adminController.listShift);
router.post('/shift/create',adminController.createShift)
router.get('/shift/addRoom',adminController.pushRoom2Shift);
router.get('/shift/addCourse',adminController.pushCourse2Shift);

router.get('/exam', function (req, res, next) {
    res.send('exam management /list /create /update /delete');
})

router.get('/exam/addShift',adminController.pushShift2Exam);
router.get('/exam/list',adminController.printShift);
router.post('/exam/create' , adminController.createExam);
//router.get('/exam/delete', adminController.deleteExam);
//router.post('/exam/update', adminController.updateExam)


module.exports = router ;
