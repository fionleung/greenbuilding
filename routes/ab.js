'use strict';


var building = require('../models/buildingModel');

exports.get_floor_number = function(id,res) {
    building.findOne({_id: id},function(err, data){
     if(err){ return console.log(err)}
      res(null,data)
  });
}

exports.get_sensor_value_time = function(name,res){
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://fion:abcd@cluster0-fomga.mongodb.net/test?retryWrites=true";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var tbname=name.toString();
    dbo.collection(tbname).find({}, function(err, result) {
      if (err) throw err;
      res(null,result.value)
      db.close();
    });
  });
}  //do no modify!!

function toTimestamp(strDate){
 var datum = Date.parse(strDate);
 return datum;
}

exports.get_sensor_value_time = function(name,start,end,res){
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
      res(null,result)
      db.close();
    });
  });
};

exports.get_sensor_value = function(name,res){
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://fion:abcd@cluster0-fomga.mongodb.net/test?retryWrites=true";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var tbname=name.toString();
    dbo.collection(tbname).findOne({}, function(err, result) {
      if (err) throw err;
      res(null,result.value)
      db.close();
    });
  });
}  //do no modify!!

exports.get_all_lighting=function(buildingid,res) {
  var result=[];
  building.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var j = 0; j < data.floors.length; j++) {
     var arr=[];
    for (var k = 0; k < data.floors[j].rooms.length; k++) {
        for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
       if (data.floors[j].rooms[k].sensors[l].sensorType=="ligthing"){
        arr.push(data.floors[j].rooms[k].sensors[l]._id.toString());
        }
     }
   }
     result.push(arr);
 }
  res(null,result)
  });
}    //do no modify!!

exports.get_all_temperature=function(buildingid,res) {
  var result=[];
  building.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var j = 0; j < data.floors.length; j++) {
     var arr=[];
    for (var k = 0; k < data.floors[j].rooms.length; k++) {
        for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
       if (data.floors[j].rooms[k].sensors[l].sensorType=="temperature"){
        arr.push(data.floors[j].rooms[k].sensors[l]._id.toString());
        }
     }
   }
     result.push(arr);
 }
  res(null,result)
  });
}    //do no modify!!

exports.get_all_humidity=function(buildingid,res) {
  var result=[];
  building.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var j = 0; j < data.floors.length; j++) {
     var arr=[];
    for (var k = 0; k < data.floors[j].rooms.length; k++) {
        for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
       if (data.floors[j].rooms[k].sensors[l].sensorType=="humility"){
        arr.push(data.floors[j].rooms[k].sensors[l]._id.toString());
        }
     }
   }
     result.push(arr);
 }
  res(null,result)
  });
}    //do no modify!!

exports.get_all_pressure=function(buildingid,res) {
  var result=[];
  building.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var j = 0; j < data.floors.length; j++) {
     var arr=[];
    for (var k = 0; k < data.floors[j].rooms.length; k++) {
        for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
       if (data.floors[j].rooms[k].sensors[l].sensorType=="pressure"){
        arr.push(data.floors[j].rooms[k].sensors[l]._id.toString());
        }
     }
   }
     result.push(arr);
 }
  res(null,result)
  });
}    //do no modify!!

exports.get_all_air=function(buildingid,res) {
  var result=[];
  building.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var j = 0; j < data.floors.length; j++) {
     var arr=[];
    for (var k = 0; k < data.floors[j].rooms.length; k++) {
        for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
       if (data.floors[j].rooms[k].sensors[l].sensorType=="air"){
        arr.push(data.floors[j].rooms[k].sensors[l]._id.toString());
        }
     }
   }
     result.push(arr);
 }
  res(null,result)
  });
}    //do no modify!!

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
