const urlExcel = './auth.xlsx' ;
const auth = require('../models/authentication.js')
const reader = require('xlsx')
const cfg =  require('../config/database')
const bcrypt = require('bcryptjs')

const mongoose = require('mongoose') ;

const importAccount = {}
  const connection = mongoose.connect( cfg.mongoURI , cfg.mongoCFG)
    .then(() => {
      console.log('mongodb connected!...')
      let database = reader.readFile(urlExcel);
      console.log(database.SheetNames);
      // get list of sheet name [ user, course , room ]
      let data = reader.utils.sheet_to_json(database.Sheets['auth']);

      for (var i = 0; i < data.length; i++)
        data[i].password = bcrypt.hashSync(data[i].password.toString(), 8);

      auth.insertMany(data,function (err) {
        if (err) console.log(err)
        else console.log('auth imported !')
      });
    })
    .catch(err => console.log(err));

module.exports = importAccount;





/*


*/

// do not care
/*
for  ( let User in  db){
    let _id = db[User].id ;
    console.log(_id);
    user.findOne({id:  _id} , function (err, data) {
         if ( err ) console.log('error')
         else {
            console.log(data)  ;
         }
    })

} */
