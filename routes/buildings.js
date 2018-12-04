var express = require('express');
var router = express.Router();
var buildingModel = require('../models/buildingModel.js');
var buildingid= "";
var selectedFloor;
var buildingaddress="";
var MongoClient = require('mongodb').MongoClient;
var aa=require("./ab.js");
var bb=require("./bts.js");
var floornumber=0;
var motionlist=[];
var lightlist=[];

//index
router.get('/index', function(req, res, next) {
  buildingModel.find(function(err, data){
    if(err){ return console.log(err) }
    var bname=[];
    var bid=[];
    var blat=[];
    var blon=[];
    for(var i=0;i<data.length;i++){
      bname.push(data[i].name);
      bid.push(data[i]._id);
      blat.push(parseFloat(data[i].latitude));
      blon.push(parseFloat(data[i].longitude));
    }
    res.render('index',{
      sum: data.length,
      bname:bname,
      bid:bid,
      blat:blat,
      blon:blon
    })
  })
});

//  for test
router.get('/vvv', function(req, res, next) {
  aa.get_sensor_value_time("M008","11/01/2018","12/06/2018",function(err, data){
    if(err){ return console.log(err) }
 res.render('test',{
//   start:start,
//   end:end,
   data:data,
  // sensor:motionlist
});
});
})

//list
router.get('/list', function(req, res, next) {
  buildingModel.find(function(err, data){
    if(err){ return console.log(err) }
    res.render('building_list',{
      building:data,
      keywordtips:"Search..."
    })
  })
});


//search result
router.get('/search', function(req, res, next) {
     var keyword=req.query.keyword;
     var _filter={
   $or: [
     {name: {$regex: keyword, $options: '$i'}},
     {address: {$regex: keyword, $options: '$i'}}
   ]
 }
   buildingModel.find(_filter,function(err, data){
  if(err){ return console.log(err) }
  res.render('building_list',{
      building:data,
      keywordtips:keyword
    })
 })
});

// iot dashboard
router.get('/dashboard', function(req, res, next) {
  var lon=0;
  var lof=0;
  var mon=0;
  var mof=0;
  var cluon=0;
  var cluoff=0;
  var nodeon=0;
  var nodeoff=0;
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
  for (var j = 0; j < data.floors.length; j++) {
    if (data.floors[j].status=="Active"){cluon+=1;}
    else {cluoff+=1;}
   for (var k = 0; k < data.floors[j].rooms.length; k++) {
     if (data.floors[j].rooms[k].status=="Active"){nodeon+=1;}
     else {nodeoff+=1;}
       for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
      if (data.floors[j].rooms[k].sensors[l].sensorType=="light"){
       if (data.floors[j].rooms[k].sensors[l].status=="Active"){
          lon+=1;
       }
        else {lof+=1;}
    }
if (data.floors[j].rooms[k].sensors[l].sensorType=="motion"){
 if (data.floors[j].rooms[k].sensors[l].status=="Active"){
    mon+=1;
 }
  else {mof+=1;}
}
  }
 }
}
var clupercent=Math.round(cluon/(cluon+cluoff)*100);
var nodepercent=Math.round(nodeon/(nodeon+nodeoff)*100);
var lpercent=Math.round(lon/(lon+lof)*100);
var mpercent=Math.round(mon/(mon+mof)*100);
    res.render('iot',{
      building: data,
      pic: '',
      selected:-1,
      lighton:lpercent,
      mon:mpercent,
      clusterpp:clupercent,
      nodeon:nodepercent,
      address:buildingaddress,
      sum:floornumber
    });
  })
});

//buildingid/Dashboard
router.get('/:id/dashboard', function(req, res, next) {
  var lon=0;
  var lof=0;
  var mon=0;
  var mof=0;
  var cluon=0;
  var cluoff=0;
  var nodeon=0;
  var nodeoff=0;
  buildingid=req.params.id;
  buildingModel.findOne({_id: buildingid},function(err, data){
    buildingaddress=data.address;
    floornumber=data.floors.length;
   if(err){ return console.log(err) }
   for (var j = 0; j < data.floors.length; j++) {
     if (data.floors[j].status=="Active"){cluon+=1;}
     else {cluoff+=1;}
    for (var k = 0; k < data.floors[j].rooms.length; k++) {
      if (data.floors[j].rooms[k].status=="Active"){nodeon+=1;}
      else {nodeoff+=1;}
        for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
       if (data.floors[j].rooms[k].sensors[l].sensorType=="light"){
        if (data.floors[j].rooms[k].sensors[l].status=="Active"){
           lon+=1;
        }
         else {lof+=1;}
     }
     if (data.floors[j].rooms[k].sensors[l].sensorType=="motion"){
      if (data.floors[j].rooms[k].sensors[l].status=="Active"){
         mon+=1;
      }
       else {mof+=1;}
   }
   }
   }
   }
   var clupercent=Math.round(cluon/(cluon+cluoff)*100);
   var nodepercent=Math.round(nodeon/(nodeon+nodeoff)*100);
   var lpercent=Math.round(lon/(lon+lof)*100);
   var mpercent=Math.round(mon/(mon+mof)*100);
    res.render('iot',{
      clusterpp:clupercent,
      nodeon:nodepercent,
      building: data,
      pic: '',
      selected:-1,
      lighton:lpercent,
      mon:mpercent,
      address:buildingaddress,
      sum:floornumber
    });
  })
});

//dashboard/floors
router.get('/dashboard/:id', function (req, res, next) {
  selectedFloor_id = req.params.id;
  var lon=0;
  var lof=0;
  var mon=0;
  var mof=0;
  var nodeon=0;
  var nodeoff=0;
  var clupercent=0;
  buildingModel.findOne({_id: buildingid}, function (err, data) {
    if (data.floors[selectedFloor_id].status=="Active"){var clupercent=100;}
     for (var k = 0; k < data.floors[selectedFloor_id].rooms.length; k++) {
       if (data.floors[selectedFloor_id].rooms[k].status=="Active"){nodeon+=1;}
       else {nodeoff+=1;}
         for (var l = 0; l < data.floors[selectedFloor_id].rooms[k].sensors.length; l++) {
        if (data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType=="light"){
         if (data.floors[selectedFloor_id].rooms[k].sensors[l].status=="Active"){
            lon+=1;
         }
          else {lof+=1;}
      }
      if (data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType=="motion"){
       if (data.floors[selectedFloor_id].rooms[k].sensors[l].status=="Active"){
          mon+=1;
       }
        else {mof+=1;}
    }
   }
  }

  var nodepercent=Math.round(nodeon/(nodeon+nodeoff)*100);
  var lpercent=Math.round(lon/(lon+lof)*100);
  var mpercent=Math.round(mon/(mon+mof)*100);
    res.render('iot', {
    building:data,
    pic:data.floors[selectedFloor_id].floorMap,
    selected:selectedFloor_id,
    lighton:lpercent,
    mon:mpercent,
    clusterpp:clupercent,
    nodeon:nodepercent,
    address:buildingaddress,
    sum:floornumber
    })
  })
});

//Motion
router.get('/mon', function(req, res, next) {
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
  for (var j = 0; j < data.floors.length; j++) {
   for (var k = 0; k < data.floors[j].rooms.length; k++) {
       for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
      if (data.floors[j].rooms[k].sensors[l].sensorType=="motion"){
       arr=[data.floors[j].rooms[k].sensors[l].sensorName,data.floors[j].rooms[k].sensors[l].sensorType,data.floors[j].clusterName,data.floors[j].rooms[k].nodeName,data.floors[j].rooms[k].sensors[l].status,];
       result.push(arr);
       }
    }
  }
}
    res.render('iot_mon',{
      building: data,
      pic: '',
      selected:-1,
      sensorlist:result,
      address:buildingaddress
    });
  })
});

//motion/floors
router.get('/mon/:id', function(req, res, next) {
  selectedFloor_id = req.params.id;
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var k = 0; k < data.floors[selectedFloor_id].rooms.length; k++) {
       for (var l = 0; l < data.floors[selectedFloor_id].rooms[k].sensors.length; l++) {
      if (data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType=="motion"){
       arr=[data.floors[selectedFloor_id].rooms[k].sensors[l].sensorName,data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType,data.floors[selectedFloor_id].clusterName,data.floors[selectedFloor_id].rooms[k].nodeName,data.floors[selectedFloor_id].rooms[k].sensors[l].status];
       result.push(arr);
       }
    }
  }
    res.render('iot_mon',{
      building: data,
      pic:data.floors[selectedFloor_id].floorMap,
      selected:selectedFloor_id,
      sensorlist:result,
      address:buildingaddress
    });
  })
});

//light
router.get('/lig', function(req, res, next) {
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
  for (var j = 0; j < data.floors.length; j++) {
   for (var k = 0; k < data.floors[j].rooms.length; k++) {
       for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
      if (data.floors[j].rooms[k].sensors[l].sensorType=="light"){
       arr=[data.floors[j].rooms[k].sensors[l].sensorName,data.floors[j].rooms[k].sensors[l].sensorType,data.floors[j].clusterName,data.floors[j].rooms[k].nodeName,data.floors[j].rooms[k].sensors[l].status,];
       result.push(arr);
       }
    }
  }
}
    res.render('iot_lig',{
      building: data,
      pic: '',
      selected:-1,
      sensorlist:result,
      address:buildingaddress
    });
  })
});

//motion/floors
router.get('/lig/:id', function(req, res, next) {
  selectedFloor_id = req.params.id;
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var k = 0; k < data.floors[selectedFloor_id].rooms.length; k++) {
       for (var l = 0; l < data.floors[selectedFloor_id].rooms[k].sensors.length; l++) {
      if (data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType=="light"){
       arr=[data.floors[selectedFloor_id].rooms[k].sensors[l].sensorName,data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType,data.floors[selectedFloor_id].clusterName,data.floors[selectedFloor_id].rooms[k].nodeName,data.floors[selectedFloor_id].rooms[k].sensors[l].status];
       result.push(arr);
       }
    }
  }
    res.render('iot_lig',{
      building: data,
      pic:data.floors[selectedFloor_id].floorMap,
      selected:selectedFloor_id,
      sensorlist:result,
      address:buildingaddress
    });
  })
});


//controller
router.get('/con', function(req, res, next) {
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
  for (var j = 0; j < data.floors.length; j++) {
    arr=[data.floors[j].clusterName,"Smart cluster",data.floors[j].clusterName,data.floors[j].status];
    result.push(arr);
   for (var k = 0; k < data.floors[j].rooms.length; k++) {
       arr=[data.floors[j].rooms[k].nodeName,"Smart node",data.floors[j].clusterName,data.floors[j].rooms[k].status];
       result.push(arr);
       }
    }
    res.render('iot_con',{
      building: data,
      pic: '',
      selected:-1,
      sensorlist:result,
      address:buildingaddress
    });
  })
});

//controllerc/floors
router.get('/con/:id', function(req, res, next) {
  selectedFloor_id = req.params.id;
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
    arr=[data.floors[selectedFloor_id].clusterName,"Smart cluster",data.floors[selectedFloor_id].clusterName,data.floors[selectedFloor_id].status];
    result.push(arr);
   for (var k = 0; k < data.floors[selectedFloor_id].rooms.length; k++) {
       arr=[data.floors[selectedFloor_id].rooms[k].nodeName,"Smart node",data.floors[selectedFloor_id].clusterName,data.floors[selectedFloor_id].rooms[k].status];
       result.push(arr);
       }
    res.render('iot_con',{
      building: data,
      pic:data.floors[selectedFloor_id].floorMap,
      selected:selectedFloor_id,
      sensorlist:result,
      address:buildingaddress
    });
  })
});

// id/Sensor dashboard
router.get('/:id/sdashboard', function(req, res, next) {
    buildingid=req.params.id;
    bb.get_motion_chart(buildingid,function(err,node,motiondata){
      bb.get_light_chart(buildingid,function(err,node1,lightdata){
    res.render('sen_dashboard',{
      node:node,
      motion:motiondata,
       light:lightdata,
       address:""
    });
    });
    });
    });

// Sensor dashboard
router.get('/sdashboard', function(req, res, next) {
    bb.get_motion_chart(buildingid,function(err,node,motiondata){
      bb.get_light_chart(buildingid,function(err,node1,lightdata){
   res.render('sen_dashboard',{
      node:node,
      motion:motiondata,
       light:lightdata,
       address:buildingaddress
  });
  });
  });
  });



// sensors/motion
router.get('/stem', function(req, res, next) {
aa.get_motion(buildingid,function(err,node,motion){
   motionlist=motion;
 res.render('sen_tem',{
    sensor:motionlist,
  address:buildingaddress,
});
});
});



// sensors/records
router.get('/mrecords', function(req, res, next) {
  var j=req.query.sensor.toString();
  var start=req.query.start.toString();
  var end=req.query.end.toString();
  aa.get_sensor_value_time(j,start,end,function(err, data){
    if(err){ return console.log(err) }
 res.render('sen_tem1',{
   start:start,
   end:end,
   data:data,
   sensor:motionlist,
    selectedsensor:j,
  address:buildingaddress,
});
});
});

//sensors/light
router.get('/slig', function(req, res, next) {
aa.get_light(buildingid,function(err,node,motion){
   lightlist=motion;
 res.render('sen_lig',{
    sensor:lightlist,
  address:buildingaddress,
});
});
});



// sensors/records-light
router.get('/lrecords', function(req, res, next) {
  var j=req.query.sensor.toString();
  var start=req.query.start.toString();
  var end=req.query.end.toString();
  aa.get_sensor_value_time(j,start,end,function(err, data){
    if(err){ return console.log(err) }
 res.render('sen_lig1',{
   start:start,
   end:end,
   data:data,
   sensor:lightlist,
    selectedsensor:j,
  address:buildingaddress,
});
});
});






module.exports = router;
