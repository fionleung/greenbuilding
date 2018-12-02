var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://fion:abcd@cluster0-shard-00-00-fomga.mongodb.net:27017,cluster0-shard-00-01-fomga.mongodb.net:27017,cluster0-shard-00-02-fomga.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {useMongoClient: true});
mongoose.connect('mongodb+srv://fion:abcd@cluster0-fomga.mongodb.net/test?retryWrites=true');

var buildingSchema = new mongoose.Schema({
  name: String,
  longitude: String,
  latitude: String,
  address:String,
  floors: [{
    clusterName: String,
    status: String,
    floorMap: String,
    rooms: [{
        nodeName: String,
        status: String,
        sensors: [{
            sensorName: String,
            status: String,
            sensorType: String
        }]
    }]
  }]
});

var model = mongoose.model('Building', buildingSchema);
module.exports = model;
