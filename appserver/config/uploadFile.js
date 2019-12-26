let multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});



const upload = multer({
    storage,
    fileFilter(res, file, cb){
        if(!file.originalname.match(/\.(xls|xlsx|csv)$/)){
            return cb(new Error('Please upload a excel file'));
        }
        cb(undefined, true)
    }
});


module.exports = upload ;