let mongoose = require('mongoose') ;
//db config
let connections = require('../config/database');

const Mongoose = mongoose.connect(connections.mongoURI, connections.mongoCFG)
    .then(success=>{
        console.log('Connect to mongodb successfully')
    }).catch(err=>{
    console.log('Can not connect to mongodb : ');
});


module.exports = Mongoose ;