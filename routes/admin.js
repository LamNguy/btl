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
//ter.get('/', authController.verifyToken, authController.checkAdminToken);
//router.use(authController.verifyToken, authController.checkAdminToken)
//router.use(authController.verifyToken);



/*
 *    User management
 */

router.get('/user', function (req,res) {
    res.send('manage user');
});
router.get('/user/list', authController.verifyToken, authController.checkAdminToken, adminController.listUser) ;
router.post('/user/create',  authController.verifyToken, authController.checkAdminToken, adminController.createNewUser);

router.route('/user/:id')
    .get( authController.verifyToken, authController.checkAdminToken, adminController.findUserByID)
    .delete(  authController.verifyToken, authController.checkAdminToken, adminController.deleteUser)
    .put( authController.verifyToken, authController.checkAdminToken, adminController.updateUser);

router.route('/user/:id/courses')
  .get( authController.verifyToken, authController.checkAdminToken, adminController.getUserCourses)


/*
 *   Course management
 */
router.get('/course', authController.verifyToken, authController.checkAdminToken, function (req, res) {
    res.send('manage course');
});
router.get('/course/list' , authController.verifyToken, authController.checkAdminToken, adminController.listCourse);
router.post('/course/create', authController.verifyToken, authController.checkAdminToken, adminController.createNewCourse);

router.route('/course/:id')
    .get( authController.verifyToken, authController.checkAdminToken, adminController.findCourseById)
    .delete( authController.verifyToken, authController.checkAdminToken, adminController.deleteCourse)
    .put( authController.verifyToken, authController.checkAdminToken, adminController.updateCourse);

/*
 *   Room management
 */

router.get('/room', authController.verifyToken, authController.checkAdminToken, function (req, res) {
    res.send('room home page');
});

router.get('/room/list' , authController.verifyToken, authController.checkAdminToken, adminController.listRoom);
router.post('/room/create' , authController.verifyToken, authController.checkAdminToken, adminController.createNewRoom);


router.route('/room/:id')
    .get( authController.verifyToken, authController.checkAdminToken, adminController.findRoomById)
    .delete( authController.verifyToken, authController.checkAdminToken, adminController.deleteRoom)
    .put( authController.verifyToken, authController.checkAdminToken, adminController.updateRoom);




// shift

router.get('/shift',  authController.verifyToken, authController.checkAdminToken, function (req,res) {
    res.send('shift home page')
});
router.get('/shift/list', authController.verifyToken, authController.checkAdminToken, adminController.listShift);
router.post('/shift/create', authController.verifyToken, authController.checkAdminToken, adminController.createShift);
router.route('/shift/:id')
    .get( authController.verifyToken, authController.checkAdminToken, adminController.findShiftById)
    .delete( authController.verifyToken, authController.checkAdminToken, adminController.removeShift)
    .put( authController.verifyToken, authController.checkAdminToken, adminController.updateShift);



//router.put('/shift/addRoom',adminController.pushRoom2Shift);
//router.put('/shift/addCourse',adminController.pushCourse2Shift);


router.get('/exam', authController.verifyToken, authController.checkAdminToken, function (req, res, next) {
    res.send('exam management /list /create /update /delete');
});

router.post('/exam/addShift', authController.verifyToken, authController.checkAdminToken, adminController.pushShift2Exam);
router.get('/exam/list', authController.verifyToken,   authController.checkAdminToken, adminController.listExam);
router.post('/exam/create', authController.verifyToken, authController.checkAdminToken, adminController.createExam);

// --------------------------------
router.route('/exam/:id')
    .get( authController.verifyToken, authController.checkAdminToken, adminController.findExam)
    .delete( authController.verifyToken, authController.checkAdminToken, adminController.deleteExam);
   // .put(adminController.updateShift);

//router.get('/exam/delete', adminController.deleteExam);
//router.post('/exam/update', adminController.updateExam)



router.post('/import', authController.verifyToken, authController.checkAdminToken, uploadFileConfig.single('import'),uploadController.importDb);
router.post('/updateQ',  authController.verifyToken, authController.checkAdminToken, uploadFileConfig.single('updateQ'),uploadController.updateStudentQualified);
router.post('/updateUQ',   authController.verifyToken, authController.checkAdminToken, uploadFileConfig.single('updateUQ'),uploadController.updateStudentUnQualified);
router.post('/updateAuth',   authController.verifyToken, authController.checkAdminToken, uploadFileConfig.single('updateAuth'), uploadController.updateAuth)


module.exports = router ;
