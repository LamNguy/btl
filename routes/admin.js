var express = require('express');
var router = express.Router();

let adminController = require('../appserver/controller/adminController')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('admin home page - /user or /exam or /course ');
});


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
router.get('/course', function (req, res, next) {
    res.send('course management /list /create /find /update /delete');
})
router.get('/course/list' , adminController.listCourse);
router.post('/course/create' , adminController.createNewCourse);
router.get('/course/find',adminController.findCourseById);
router.get('/course/delete',adminController.deleteCourse);
router.put('/course/update', adminController.updateCourse);





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
//router.post('/exam/create' , adminController.createNewExam);
//router.post('/exam/update', adminController.updateExam)


module.exports = router ;
