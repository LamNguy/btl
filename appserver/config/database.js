/*
 *  TODO : Database configure
 */


module.exports = {
  mongoURI: 'mongodb://localhost:27017/mydb',
  //mongodb+srv://test:test@cluster0-4stuo.gcp.mongodb.net/todo?retryWrites=true&w=majority
  mongoCFG: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true,
<<<<<<< HEAD
    useFindAndModify: false
=======
    // useFindAndModify: false
=======
    useFindAndModify: false
>>>>>>> 85b15a6dd2c115f034827de324f368c13e72b18d
>>>>>>> 214795433d1183d1983ff46234bfcc03e259ca92
    //ssl: true,
    //replicaSet: 'Cluster0-shard-0',
    //authSource: 'admin',
    //retryWrites: true
  }
};
