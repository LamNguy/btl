/*
 *  TODO : Init mongoose connection
 */


let mongoose = require('mongoose') ;
let connections = require('../config/database');

const Mongoose = mongoose.connect(connections.mongoURI, connections.mongoCFG)
    .then(r=>{
        console.log('Connect to mongodb successfully')
    }).catch(e=>{
        console.log('Can not connect to mongodb : ');
});


module.exports = Mongoose ;