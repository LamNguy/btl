var express = require('express');
var router = express.Router();





/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('home page');
});

router.get('/data' , function (req, res) {
  res.send({name: 'Nguyen Duc Lam'});
});


//============================session========================






module.exports = router;
