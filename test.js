

function get_sensor_value_time(name,start,end,res){
  var v1=Date.parse(start);
  var v2=Date.parse(end);
   var sensorgroup=[];
   var MongoClient = require('mongodb').MongoClient;
   var url = "mongodb+srv://admin:admin@annachow-hjvei.mongodb.net/test?retryWrites=true";
   MongoClient.connect(url, function(err, db) {
     if (err) throw err;
     var dbo = db.db("test");
       dbo.collection("dataschemas").findOne({ sensorName: name}, function(err, result) {
       if (err) throw err;


       for(var j=0;j<result.data.length;j++) {
         var arr=[];
         var t=Date.parse(result.data[j].timestamp.toISOString());
          if ((t>v1)&&(t<v2)) {
          var t=Date.parse(result.data[j].timestamp.toISOString());
           arr.push(t,result.data[j].value);
         sensorgroup.push(arr);
         }
        }
           res(null,sensorgroup);
           console.log(sensorgroup);
     });
   });
   };




get_sensor_value_time("M008","11/01/2018","12/15/2018",function(err, data){

});
