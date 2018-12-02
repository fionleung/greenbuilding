var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://fion:abcd@cluster0-shard-00-00-fomga.mongodb.net:27017,cluster0-shard-00-01-fomga.mongodb.net:27017,cluster0-shard-00-02-fomga.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {useMongoClient: true});

var userSchema = new mongoose.Schema({
    username: String,
    email: String
})

var model = mongoose.model('user', userSchema);

module.exports = model;
