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
    useFindAndModify: false
    //ssl: true,
    //replicaSet: 'Cluster0-shard-0',
    //authSource: 'admin',
    //retryWrites: true
  }
};
