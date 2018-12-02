var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://fion:abcd@cluster0-shard-00-00-fomga.mongodb.net:27017,cluster0-shard-00-01-fomga.mongodb.net:27017,cluster0-shard-00-02-fomga.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {useMongoClient: true});
mongoose.connect('mongodb+srv://fion:abcd@cluster0-fomga.mongodb.net/test?retryWrites=true');

var sensorSchema = new mongoose.Schema({
  timestamp:Object,
  status:Number,
  value:Number,
  dataType:String
});

var model = mongoose.model('sensor', sensorSchema);
module.exports = model;
