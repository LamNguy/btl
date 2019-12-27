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
>>>>>>> 947fec68c3fcacef3b718fc6e731c8245a3b4e75
    //ssl: true,
    //replicaSet: 'Cluster0-shard-0',
    //authSource: 'admin',
    //retryWrites: true
  }
};
