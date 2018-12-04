var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@annachow-hjvei.mongodb.net/test?retryWrites=true";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
    dbo.collection("dataschemas").findOne({ sensorName: "M001"}, function(err, result) {
    if (err) throw err;
    var n=result.data.length;
    console.log(result.data[n-1].value);
    db.close();
  });
});
