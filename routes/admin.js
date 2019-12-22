const express = require('express');
const router = express.Router();
const adminController = require('../appserver/controller/adminController')
const authController = require('../appserver/controller/authController')
const jwt = require('jsonwebtoken')



/*
 *   Login
 */
router.get('/', authController.verifyToken, authController.checkAdminToken);


/*
 *    User management
 */

router.get('/user', function (req,res) {
    res.send('manage user');
});
router.get('/user/list', adminController.listUser) ;
router.post('/user/create',adminController.createNewUser);

router.route('/user/:id')
    .get(adminController.findUserByID)
    .delete(adminController.deleteUser)
    .put(adminController.updateUser);


/*
 *   Course management
 */
router.get('/course', function (req, res) {
    res.send('manage course');
});
router.get('/course/list' , adminController.listCourse);
router.post('/course/create',adminController.createNewCourse);

router.route('/course/:id')
    .get(adminController.findCourseById)
    .delete(adminController.deleteCourse)
    .put(adminController.updateCourse);

/*
 *   Room management
 */

router.get('/room', function (req, res) {
    res.send('room home page');
});

router.route('/room/:id')
    .get(adminController.findRoomById)
    .delete(adminController.deleteRoom)
    .put(adminController.updateRoom);

router.get('/room/list' , adminController.listRoom);
router.post('/room/create' , adminController.createNewRoom);



// not fixxxxx
// shift

router.get('/shift', function (req,res) {
    res.send('shift home page')
});

router.route('/shift/:id')
    .get(adminController.findShiftById)
    .delete(adminController.removeShift)
    .put(adminController.updateShift);
router.get('/shift/list',adminController.listShift);
router.post('/shift/create',adminController.createShift);


router.put('/shift/addRoom',adminController.pushRoom2Shift);
router.put('/shift/addCourse',adminController.pushCourse2Shift);


router.get('/exam', function (req, res, next) {
    res.send('exam management /list /create /update /delete');
})

router.get('/exam/addShift',adminController.pushShift2Exam);
router.get('/exam/list',adminController.printShift);
router.post('/exam/create' , adminController.createExam);
//router.get('/exam/delete', adminController.deleteExam);
//router.post('/exam/update', adminController.updateExam)


module.exports = router ;
