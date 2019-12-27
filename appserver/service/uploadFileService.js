/*
 *  TODO : upload excel,csv file service
 */


const user = require('../models/user');
const course = require('../models/course');
const room = require('../models/room');
//const auth = require('../models/authentication');
const read = require('xlsx');
require('../config/mongoose') ;
let async = require('async');


const uploadFileService = {};

// todo : import database
uploadFileService.importDB = function(filename){
    return new Promise((resolve, reject) => {

        let database = read.readFile('./uploads/' +filename);

        async.each(database.SheetNames, sheet=>{
            let db = read.utils.sheet_to_json(database.Sheets[sheet]);
            switch ( sheet ) {

                case 'user' : {
                    user.insertMany(db,function (err) {
                        if (err) console.log(err);
                        else console.log('user imported !')
                    });
                    break ;
                }

                case 'course':  {
                    course.insertMany(db,function (err) {
                        if (err) console.log(err);
                        else console.log('course imported !')
                    });
                    break ;
                }

                case 'room' : {
                    room.insertMany(db,function (err) {
                        if (err) console.log(err);
                        else console.log('room imported !')
                    });
                    break ;
                }
                default:    console.log('db not exist collection :' + sheet);
            }
        });

        resolve('import complete');
    })
};

// todo : import list of students who are qualified
uploadFileService.updateStudentQualified = function(filename){
    return new  Promise((resolve, reject) => {
        let database = read.readFile('./uploads/'+ filename);

        async.each(database.SheetNames,sheet=>{

            let db = read.utils.sheet_to_json(database.Sheets[sheet]);
            let splits =  sheet.split(" ");
            console.log(splits);
            async.each(db,e=>{
                user.findOneAndUpdate({id: e.id}, {
                    $push: {
                        subject: {
                            idCourse: splits[0],
                            status: splits[1]
                        }
                    }
                }, {new: true,}, function (err, result) {
                    if (err) reject(err);
                    if (!result) reject('not found');

                    resolve('success update');

                })
            })
        });
    });
};

// todo : import list of students who are not qualified
uploadFileService.updateStudentUnQualified = function(filename){
    return new  Promise((resolve, reject) => {
        let database = read.readFile('./uploads/'+ filename);

        async.each(database.SheetNames,sheet=>{
            let db = read.utils.sheet_to_json(database.Sheets[sheet]);
            let splits =  sheet.split(" ");
            //console.log(splits);

            async.each(db,e=>{
                console.log(e);
                user.findOneAndUpdate({id: e.id,"subject.idCourse":splits[0]}, {
                    $set: {
                        // idCourse: splits[0],
                        "subject.$.status": splits[1]
                    }
                }, {new: true}, function (err, result) {
                    if (err) reject(err);
                    
                    resolve('success');

                })
            });
        });

    })
};

module.exports = uploadFileService;