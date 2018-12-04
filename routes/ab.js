'use strict';


var building = require('../models/buildingModel');
var sensor = require('../models/sensorModel');

exports.get_floor_number = function(id,res) {
    building.findOne({_id: id},function(err, data){
     if(err){ return console.log(err)}
      res(null,data)
  });
}



function toTimestamp(strDate){
 var datum = Date.parse(strDate);
 return datum;
}

exports.get_sensor_value_time1 = function(name,start,end,res){
  var v1=toTimestamp(start);
  var v2=toTimestamp(end);
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://admin:admin@annachow-hjvei.mongodb.net/test?retryWrites=true";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
 var tbname=name.toString();
    dbo.collection(tbname).find({ timestamp: { $gt: v1, $lt: v2 } } ,{projection: {_id:0,timestamp:1,value:1}}).toArray(function(err, result) {
      if (err) throw err;
      res(null,result)
      db.close();
    });
  });
};

exports.get_sensor_value = function(name,res){
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://admin:admin@annachow-hjvei.mongodb.net/test?retryWrites=true";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
      dbo.collection("dataschemas").findOne({ sensorName: name}, function(err, result) {
      if (err) throw err;
      var n=result.data.length;
      res(null,result.data[n-1].value)
    });
  });
  };
 //do no modify!!




exports.get_all_lighting=function(buildingid,res) {
  var result=[];
  building.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var j = 0; j < data.floors.length; j++) {
     var arr=[];
    for (var k = 0; k < data.floors[j].rooms.length; k++) {
        for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
       if (data.floors[j].rooms[k].sensors[l].sensorType=="light"){
        arr.push(data.floors[j].rooms[k].sensors[l].sensorName.toString());
        }
     }
   }
     result.push(arr);
 }
  res(null,result)
  });
}    //do no modify!!

exports.get_motion=function(buildingid,res) {
  var node=[];
  var motion=[];
  var light=[];
  building.findOne({_id: buildingid},function(err,data){
   if(err){ return console.log(err) }
   for (var j = 0; j < data.floors.length; j++) {
    for (var k = 0; k < data.floors[j].rooms.length; k++) {
          node.push(data.floors[j].rooms[k].nodeName);
        for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {

       if (data.floors[j].rooms[k].sensors[l].sensorType=="motion"){
        motion.push(data.floors[j].rooms[k].sensors[l].sensorName);
        }
         }
     }
   }
  res(null,node,motion)
  });
}    //do no modify!!

exports.get_light=function(buildingid,res) {
  var node=[];
  var motion=[];
  var light=[];
  building.findOne({_id: buildingid},function(err,data){
   if(err){ return console.log(err) }
   for (var j = 0; j < data.floors.length; j++) {
    for (var k = 0; k < data.floors[j].rooms.length; k++) {
          node.push(data.floors[j].rooms[k].nodeName);
        for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {

       if (data.floors[j].rooms[k].sensors[l].sensorType=="light"){
        motion.push(data.floors[j].rooms[k].sensors[l].sensorName);
        }
         }
     }
   }
  res(null,node,motion)
  });
}    //do no modify!!


exports.get_nodes=function(buildingid,res) {
  var node=[];
  building.findOne({_id: buildingid},function(err,data){
   if(err){ return console.log(err) }
   for (var j = 0; j < data.floors.length; j++) {
    for (var k = 0; k < data.floors[j].rooms.length; k++) {
          node.push(data.floors[j].rooms[k].nodeName);
         }
     }
  res(null,node)
  });
}    //do no modify!!

exports.get_sensor_value_time=function(name,start,end,res){
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



exports.get_temperature_byfloor=function(buildingid,fname,res) {
  var result=[];
  var room=[];
  building.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   var pic=data.floors[fname].floorMap;
   for (var k = 0; k < data.floors[fname].rooms.length; k++) {
       for (var l = 0; l < data.floors[fname].rooms[k].sensors.length; l++) {
      if (data.floors[fname].rooms[k].sensors[l].sensorType=="temperature"){
       result.push(data.floors[fname].rooms[k].sensors[l]._id.toString());
       room.push(data.floors[fname].rooms[k].nodeName.toString());
       }
    }
  }
  res(null,result,room,pic)
  });
}

exports.get_humidity_byfloor=function(buildingid,fname,res) {
  var result=[];
  var room=[];
  building.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var k = 0; k < data.floors[fname].rooms.length; k++) {
       for (var l = 0; l < data.floors[fname].rooms[k].sensors.length; l++) {
      if (data.floors[fname].rooms[k].sensors[l].sensorType=="humility"){
       result.push(data.floors[fname].rooms[k].sensors[l]._id.toString());
       room.push(data.floors[fname].rooms[k].nodeName.toString());
       }
    }
  }
  res(null,result,room)
  });
}

exports.get_air_byfloor=function(buildingid,fname,res) {
  var result=[];
  var room=[];
  building.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var k = 0; k < data.floors[fname].rooms.length; k++) {
       for (var l = 0; l < data.floors[fname].rooms[k].sensors.length; l++) {
      if (data.floors[fname].rooms[k].sensors[l].sensorType=="air"){
       result.push(data.floors[fname].rooms[k].sensors[l]._id.toString());
       room.push(data.floors[fname].rooms[k].nodeName.toString());
       }
    }
  }
  res(null,result,room)
  });
}

exports.get_pressure_byfloor=function(buildingid,fname,res) {
  var result=[];
  var room=[];
  building.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var k = 0; k < data.floors[fname].rooms.length; k++) {
       for (var l = 0; l < data.floors[fname].rooms[k].sensors.length; l++) {
      if (data.floors[fname].rooms[k].sensors[l].sensorType=="pressure"){
       result.push(data.floors[fname].rooms[k].sensors[l]._id.toString());
       room.push(data.floors[fname].rooms[k].nodeName.toString());
       }
    }
  }
  res(null,result,room)
  });
}

exports.get_lighting_byfloor=function(buildingid,fname,res) {
  var result=[];
  var room=[];
  building.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var k = 0; k < data.floors[fname].rooms.length; k++) {
       for (var l = 0; l < data.floors[fname].rooms[k].sensors.length; l++) {
      if (data.floors[fname].rooms[k].sensors[l].sensorType=="ligthing"){
       result.push(data.floors[fname].rooms[k].sensors[l]._id.toString());
       room.push(data.floors[fname].rooms[k].nodeName.toString());
       }
    }
  }
  res(null,result,room)
  });
}
