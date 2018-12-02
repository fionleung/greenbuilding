var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://fion:abcd@cluster0-fomga.mongodb.net/test?retryWrites=true';
var moment = require('moment');
moment().format('YYYY-MM-DD, h:mm:ss');
var now = moment();


var a=function(req){MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('db created');
    var dbase = db.db("test");
      var name=req.toString();
     dbase.createCollection(name, function (err, res) {
       if (err) throw err;
      console.log("collection created");
    for (var m=1;m<12;m++){
    for (var d=1;d<20;d=d+4){
     for (var h=9;h<20;h=h+4)  {
       var date = new Date(2018, m, d, h, 30, 0);
       var timestamp=date.getTime();
        var myobj = {
          timestamp:timestamp,
          status:1,
          value:Math.round((40+Math.random()*20)),
          dataType:"%"
        };
         dbase.collection(name).insertOne(myobj, function(err, res) {
        if (err) throw err;
      });
        }
      }
    }
         console.log("inserted");
         db.close();
      });
});
}

var tem=["5bedd7a4d6c48801bcfa0ef4","5bedd7a4d6c48801bcfa0eef","5bedd7a4d6c48801bcfa0ee5","5bedd7a4d6c48801bcfa0ecb","5bedd7a4d6c48801bcfa0ec5","5bedd7a4d6c48801bcfa0ec1","5bedd7a4d6c48801bcfa0eba","5bedd7a4d6c48801bcfa0eaf","5bedd7a4d6c48801bcfa0eab"];
for (var i=0;i<tem.length;i++) {a(tem[i]);}

//humility 40-60
//Pessure 200-800PA
//AQI 50-100 moderate
//temperature:68-77 F
//lighting:300-500 lux
//var lightingtb=['5bedd7a4d6c48801bcfa0ef5','5bedd7a4d6c48801bcfa0ef0','5bedd7a4d6c48801bcfa0eeb','5bedd7a4d6c48801bcfa0ee7','5bedd7a4d6c48801bcfa0ee1','5bedd7a4d6c48801bcfa0ed8','5bedd7a4d6c48801bcfa0ed5','5bedd7a4d6c48801bcfa0ed2','5bedd7a4d6c48801bcfa0ecf','5bedd7a4d6c48801bcfa0ec7','5bedd7a4d6c48801bcfa0eb7','5bedd7a4d6c48801bcfa0eb2','5bedd7a4d6c48801bcfa0eac'];
//var tem=["5bedd7a4d6c48801bcfa0ef2","5bedd7a4d6c48801bcfa0eed","5bedd7a4d6c48801bcfa0ee9","5bedd7a4d6c48801bcfa0ee3","5bedd7a4d6c48801bcfa0ee0","5bedd7a4d6c48801bcfa0ed7","5bedd7a4d6c48801bcfa0ed1","5bedd7a4d6c48801bcfa0ece","5bedd7a4d6c48801bcfa0eca","5bedd7a4d6c48801bcfa0ec4","5bedd7a4d6c48801bcfa0ebf","5bedd7a4d6c48801bcfa0ebb","5bedd7a4d6c48801bcfa0eb4","5bedd7a4d6c48801bcfa0eb0","5bedd7a4d6c48801bcfa0ea8"];
//var air=["5bedd7a4d6c48801bcfa0ef3","5bedd7a4d6c48801bcfa0eee","5bedd7a4d6c48801bcfa0eea","5bedd7a4d6c48801bcfa0ee6","5bedd7a4d6c48801bcfa0edd","5bedd7a4d6c48801bcfa0ecd","5bedd7a4d6c48801bcfa0ec2","5bedd7a4d6c48801bcfa0ebd","5bedd7a4d6c48801bcfa0eb6","5bedd7a4d6c48801bcfa0eb1","5bedd7a4d6c48801bcfa0eaa"]
//var pressure=["5bedd7a4d6c48801bcfa0ee4","5bedd7a4d6c48801bcfa0edf","5bedd7a4d6c48801bcfa0edc","5bedd7a4d6c48801bcfa0edb","5bedd7a4d6c48801bcfa0eda","5bedd7a4d6c48801bcfa0ed4","5bedd7a4d6c48801bcfa0ecc","5bedd7a4d6c48801bcfa0ec6","5bedd7a4d6c48801bcfa0ec0","5bedd7a4d6c48801bcfa0ebc","5bedd7a4d6c48801bcfa0eb5","5bedd7a4d6c48801bcfa0eae","5bedd7a4d6c48801bcfa0ea9"];
//var humidity=["5bedd7a4d6c48801bcfa0ef4","5bedd7a4d6c48801bcfa0eef","5bedd7a4d6c48801bcfa0ee5","5bedd7a4d6c48801bcfa0ecb","5bedd7a4d6c48801bcfa0ec5","5bedd7a4d6c48801bcfa0ec1","5bedd7a4d6c48801bcfa0eba","5bedd7a4d6c48801bcfa0eaf","5bedd7a4d6c48801bcfa0eab"];
