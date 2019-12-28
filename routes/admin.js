const express = require('express');
const router = express.Router();
const adminController = require('../appserver/controller/adminController');
const authController = require('../appserver/controller/authController');
const uploadFileConfig = require('../appserver/config/uploadFile');
const uploadController = require('../appserver/controller/uploadFileController');
//const jwt = require('jsonwebtoken')



/*
 *   Login
 */
router.get('/', authController.checkAdminToken);
//router.use(authController.verifyToken, authController.checkAdminToken)
router.use(authController.verifyToken);



/*
 *    User management
 */

router.get('/user', function (req,res) {
    res.send('manage user');
});
router.get('/user/list', authController.checkAdminToken, adminController.listUser) ;
router.post('/user/create', authController.checkAdminToken, adminController.createNewUser);

router.route('/user/:id')
    .get(authController.checkAdminToken, adminController.findUserByID)
    .delete( authController.checkAdminToken, adminController.deleteUser)
    .put(authController.checkAdminToken, adminController.updateUser);

router.route('/user/:id/courses')
  .get(authController.checkAdminToken, adminController.getUserCourses)


/*
 *   Course management
 */
router.get('/course', authController.checkAdminToken, function (req, res) {
    res.send('manage course');
});
router.get('/course/list' ,authController.checkAdminToken, adminController.listCourse);
router.post('/course/create',authController.checkAdminToken, adminController.createNewCourse);

router.route('/course/:id')
    .get(authController.checkAdminToken, adminController.findCourseById)
    .delete(authController.checkAdminToken, adminController.deleteCourse)
    .put(authController.checkAdminToken, adminController.updateCourse);

/*
 *   Room management
 */

router.get('/room',authController.checkAdminToken, function (req, res) {
    res.send('room home page');
});

router.get('/room/list' ,authController.checkAdminToken, adminController.listRoom);
router.post('/room/create' ,authController.checkAdminToken, adminController.createNewRoom);


router.route('/room/:id')
    .get(authController.checkAdminToken, adminController.findRoomById)
    .delete(authController.checkAdminToken, adminController.deleteRoom)
    .put(authController.checkAdminToken, adminController.updateRoom);




// shift

router.get('/shift', authController.checkAdminToken, function (req,res) {
    res.send('shift home page')
});
router.get('/shift/list',authController.checkAdminToken, adminController.listShift);
router.post('/shift/create',authController.checkAdminToken, adminController.createShift);
router.route('/shift/:id')
    .get(authController.checkAdminToken, adminController.findShiftById)
    .delete(authController.checkAdminToken, adminController.removeShift)
    .put(authController.checkAdminToken, adminController.updateShift);



//router.put('/shift/addRoom',adminController.pushRoom2Shift);
//router.put('/shift/addCourse',adminController.pushCourse2Shift);


router.get('/exam',authController.checkAdminToken, function (req, res, next) {
    res.send('exam management /list /create /update /delete');
});

router.post('/exam/addShift',authController.checkAdminToken, adminController.pushShift2Exam);
router.get('/exam/list',  authController.checkAdminToken, adminController.listExam);
router.post('/exam/create',authController.checkAdminToken, adminController.createExam);

// --------------------------------
router.route('/exam/:id')
    .get(authController.checkAdminToken, adminController.findExam)
    .delete(authController.checkAdminToken, adminController.deleteExam);
   // .put(adminController.updateShift);

//router.get('/exam/delete', adminController.deleteExam);
//router.post('/exam/update', adminController.updateExam)



router.post('/import',authController.checkAdminToken, uploadFileConfig.single('import'),uploadController.importDb);
router.post('/updateQ', authController.checkAdminToken, uploadFileConfig.single('updateQ'),uploadController.updateStudentQualified);
router.post('/updateUQ',  authController.checkAdminToken, uploadFileConfig.single('updateUQ'),uploadController.updateStudentUnQualified);
router.post('/updateAuth',  authController.checkAdminToken, uploadFileConfig.single('updateAuth'), uploadController.updateAuth)


module.exports = router ;
