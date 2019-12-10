const urlExcel = './update.xlsx' ;
const user = require('../models/user');
const course = require('../models/course');
const room = require('../models/room');
const auth = require('../models/authentication')
let   read = require('xlsx')
let uri =  require('../config/database')

let mongoose = require('mongoose') ;

mongoose.connect( uri.url , {useNewUrlParser: true} ,{ useFindAndModify: false }) ;

let database = read.readFile(urlExcel);

let data = database.SheetNames;

// insert database
for ( let index in data ){
    // console.log(index);

    let db = read.utils.sheet_to_json(database.Sheets[data[index]]);
    let splits =  data[index].split(" ");


    //switch (data[index] ) {}
    db.forEach(e=> {

        user.findOne({id:e.id},function (err,userA) {
            if (err) console.log(err)
            else {

             if (user.checkExist(splits[0],userA)){
                 user.findOneAndUpdate({id: e.id,"subject.idCourse":splits[0]}, {
                     $set: {

                         // idCourse: splits[0],
                         "subject.$.status": splits[1]

                     }
                 }, {new: true}, function (err, res) {
                     if (err) console.log(err);
                     else console.log('update success');
                 })
             }else {
                 user.findOneAndUpdate({id: e.id}, {
                     $push: {
                         subject: {
                             idCourse: splits[0],
                             status: splits[1],
                         }
                     }
                 }, {new: true}, function (err, res) {
                     if (err) console.log(err);
                     else console.log('add success');
                 })
             }

            }
        })

    })
}

