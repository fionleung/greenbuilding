function toTimestamp(strDate){
 var datum = Date.parse(strDate);
 return datum;
}

function get_sensor_value_time(name,start,end,res){
  var v1=toTimestamp(start);
  var v2=toTimestamp(end);
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://fion:abcd@cluster0-fomga.mongodb.net/test?retryWrites=true";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
 var tbname=name.toString();
    dbo.collection(tbname).find({ timestamp: { $gt: v1, $lt: v2 } } ,{projection: {_id:0,timestamp:1,value:1}}).toArray(function(err, result) {
      if (err) throw err;
     console.log(result);
      res(null,result)
      db.close();
    });
  });
}



get_sensor_value_time("5bedd7a4d6c48801bcfa0ef5","10/01/2018","11/16/2018",function(err, data){

});
