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

// map  for test
router.get('/vvv', function(req, res, next) {
  aa.get_temperature_byfloor(buildingid,0,function(err, data,room,pic){
    if(err){ return console.log(err) }

 res.render('test',{
   data: data,
   room:room,
  pic:pic
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
  var ton=0;
  var tof=0;
  var hon=0;
  var hof=0;
  var pon=0;
  var pof=0;
  var aon=0;
  var aof=0;
  var cluon=0;
  var cluoff=0;
  var nodeon=0;
  var nodeoff=0;
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
  for (var j = 0; j < data.floors.length; j++) {
    if (data.floors[j].status=="on"){cluon+=1;}
    else {cluooff+=1;}
   for (var k = 0; k < data.floors[j].rooms.length; k++) {
     if (data.floors[j].rooms[k].status=="on"){nodeon+=1;}
     else {nodeoff+=1;}
       for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
      if (data.floors[j].rooms[k].sensors[l].sensorType=="ligthing"){
       if (data.floors[j].rooms[k].sensors[l].status=="on"){
          lon+=1;
       }
        else {lof+=1;}
    }
    if (data.floors[j].rooms[k].sensors[l].sensorType=="temperature"){
     if (data.floors[j].rooms[k].sensors[l].status=="on"){
        ton+=1;
     }
      else {tof+=1;}
  }
  if (data.floors[j].rooms[k].sensors[l].sensorType=="humility"){
   if (data.floors[j].rooms[k].sensors[l].status=="on"){
      hon+=1;
   }
    else {hof+=1;}
}
if (data.floors[j].rooms[k].sensors[l].sensorType=="air"){
 if (data.floors[j].rooms[k].sensors[l].status=="on"){
    aon+=1;
 }
  else {aof+=1;}
}
if (data.floors[j].rooms[k].sensors[l].sensorType=="pressure"){
 if (data.floors[j].rooms[k].sensors[l].status=="on"){
    pon+=1;
 }
  else {pof+=1;}
}
  }
 }
}
var clupercent=Math.round(cluon/(cluon+cluoff)*100);
var nodepercent=Math.round(nodeon/(nodeon+nodeoff)*100);
var lpercent=Math.round(lon/(lon+lof)*100);
var tpercent=Math.round(ton/(ton+tof)*100);
var apercent=Math.round(aon/(aon+aof)*100);
var hpercent=Math.round(hon/(hon+hof)*100);
var ppercent=Math.round(pon/(pon+pof)*100);
    res.render('iot',{
      building: data,
      pic: '',
      selected:-1,
      lighton:lpercent,
      tempon:tpercent,
      airon:apercent,
      humon:hpercent,
      preon:ppercent,
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
  var ton=0;
  var tof=0;
  var hon=0;
  var hof=0;
  var pon=0;
  var pof=0;
  var aon=0;
  var aof=0;
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
     if (data.floors[j].status=="on"){cluon+=1;}
     else {cluooff+=1;}
    for (var k = 0; k < data.floors[j].rooms.length; k++) {
      if (data.floors[j].rooms[k].status=="on"){nodeon+=1;}
      else {nodeoff+=1;}
        for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
       if (data.floors[j].rooms[k].sensors[l].sensorType=="ligthing"){
        if (data.floors[j].rooms[k].sensors[l].status=="on"){
           lon+=1;
        }
         else {lof+=1;}
     }
     if (data.floors[j].rooms[k].sensors[l].sensorType=="temperature"){
      if (data.floors[j].rooms[k].sensors[l].status=="on"){
         ton+=1;
      }
       else {tof+=1;}
   }
   if (data.floors[j].rooms[k].sensors[l].sensorType=="humility"){
    if (data.floors[j].rooms[k].sensors[l].status=="on"){
       hon+=1;
    }
     else {hof+=1;}
   }
   if (data.floors[j].rooms[k].sensors[l].sensorType=="air"){
   if (data.floors[j].rooms[k].sensors[l].status=="on"){
     aon+=1;
   }
   else {aof+=1;}
   }
   if (data.floors[j].rooms[k].sensors[l].sensorType=="pressure"){
   if (data.floors[j].rooms[k].sensors[l].status=="on"){
     pon+=1;
   }
   else {pof+=1;}
   }
   }
   }
   }
   var clupercent=Math.round(cluon/(cluon+cluoff)*100);
   var nodepercent=Math.round(nodeon/(nodeon+nodeoff)*100);
   var lpercent=Math.round(lon/(lon+lof)*100);
   var tpercent=Math.round(ton/(ton+tof)*100);
   var apercent=Math.round(aon/(aon+aof)*100);
   var hpercent=Math.round(hon/(hon+hof)*100);
   var ppercent=Math.round(pon/(pon+pof)*100);
    res.render('iot',{
      clusterpp:clupercent,
      nodeon:nodepercent,
      building: data,
      pic: '',
      selected:-1,
      lighton:lpercent,
      tempon:tpercent,
      airon:apercent,
      humon:hpercent,
      preon:ppercent,
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
  var ton=0;
  var tof=0;
  var hon=0;
  var hof=0;
  var pon=0;
  var pof=0;
  var aon=0;
  var aof=0;
  var nodeon=0;
  var nodeoff=0;
  var clupercent=0;
  buildingModel.findOne({_id: buildingid}, function (err, data) {
    if (data.floors[selectedFloor_id].status=="on"){var clupercent=100;}
     for (var k = 0; k < data.floors[selectedFloor_id].rooms.length; k++) {
       if (data.floors[selectedFloor_id].rooms[k].status=="on"){nodeon+=1;}
       else {nodeoff+=1;}
         for (var l = 0; l < data.floors[selectedFloor_id].rooms[k].sensors.length; l++) {
        if (data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType=="ligthing"){
         if (data.floors[selectedFloor_id].rooms[k].sensors[l].status=="on"){
            lon+=1;
         }
          else {lof+=1;}
      }
      if (data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType=="temperature"){
       if (data.floors[selectedFloor_id].rooms[k].sensors[l].status=="on"){
          ton+=1;
       }
        else {tof+=1;}
    }
    if (data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType=="humility"){
     if (data.floors[selectedFloor_id].rooms[k].sensors[l].status=="on"){
        hon+=1;
     }
      else {hof+=1;}
  }
  if (data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType=="air"){
   if (data.floors[selectedFloor_id].rooms[k].sensors[l].status=="on"){
      aon+=1;
   }
    else {aof+=1;}
  }
  if (data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType=="pressure"){
   if (data.floors[selectedFloor_id].rooms[k].sensors[l].status=="on"){
      pon+=1;
   }
    else {pof+=1;}
  }
   }
  }

  var nodepercent=Math.round(nodeon/(nodeon+nodeoff)*100);
  var lpercent=Math.round(lon/(lon+lof)*100);
  var tpercent=Math.round(ton/(ton+tof)*100);
  var apercent=Math.round(aon/(aon+aof)*100);
  var hpercent=Math.round(hon/(hon+hof)*100);
  var ppercent=Math.round(pon/(pon+pof)*100);
    res.render('iot', {
    building:data,
    pic:data.floors[selectedFloor_id].floorMap,
    selected:selectedFloor_id,
    lighton:lpercent,
    tempon:tpercent,
    airon:apercent,
    humon:hpercent,
    preon:ppercent,
    clusterpp:clupercent,
    nodeon:nodepercent,
    address:buildingaddress,
    sum:floornumber
    })
  })
});

//Temperature
router.get('/tem', function(req, res, next) {
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
  for (var j = 0; j < data.floors.length; j++) {
   for (var k = 0; k < data.floors[j].rooms.length; k++) {
       for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
      if (data.floors[j].rooms[k].sensors[l].sensorType=="temperature"){
       arr=[data.floors[j].rooms[k].sensors[l]._id,data.floors[j].rooms[k].sensors[l].sensorType,data.floors[j].rooms[k].nodeName,data.floors[j].rooms[k].sensors[l].status,data.floors[j].rooms[k].sensors[l].sensorName];
       result.push(arr);
       }
    }
  }
}
    res.render('iot_tem',{
      building: data,
      pic: '',
      selected:-1,
      sensorlist:result,
      address:buildingaddress
    });
  })
});

//Temperature/floors
router.get('/tem/:id', function(req, res, next) {
  selectedFloor_id = req.params.id;
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var k = 0; k < data.floors[selectedFloor_id].rooms.length; k++) {
       for (var l = 0; l < data.floors[selectedFloor_id].rooms[k].sensors.length; l++) {
      if (data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType=="temperature"){
       arr=[data.floors[selectedFloor_id].rooms[k].sensors[l]._id,data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType,data.floors[selectedFloor_id].rooms[k].nodeName,data.floors[selectedFloor_id].rooms[k].sensors[l].status,data.floors[selectedFloor_id].rooms[k].sensors[l].sensorName];
       result.push(arr);
       }
    }
  }
    res.render('iot_tem',{
      building: data,
      pic:data.floors[selectedFloor_id].floorMap,
      selected:selectedFloor_id,
      sensorlist:result,
      address:buildingaddress
    });
  })
});

//humility
router.get('/hum', function(req, res, next) {
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
  for (var j = 0; j < data.floors.length; j++) {
   for (var k = 0; k < data.floors[j].rooms.length; k++) {
       for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
      if (data.floors[j].rooms[k].sensors[l].sensorType=="humility"){
       arr=[data.floors[j].rooms[k].sensors[l]._id,data.floors[j].rooms[k].sensors[l].sensorType,data.floors[j].rooms[k].nodeName,data.floors[j].rooms[k].sensors[l].status,data.floors[j].rooms[k].sensors[l].sensorName];
       result.push(arr);
       }
    }
  }
}
    res.render('iot_hum',{
      building: data,
      pic: '',
      selected:-1,
      sensorlist:result,
      address:buildingaddress
    });
  })
});

//humility/floors
router.get('/hum/:id', function(req, res, next) {
  selectedFloor_id = req.params.id;
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var k = 0; k < data.floors[selectedFloor_id].rooms.length; k++) {
       for (var l = 0; l < data.floors[selectedFloor_id].rooms[k].sensors.length; l++) {
      if (data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType=="humility"){
       arr=[data.floors[selectedFloor_id].rooms[k].sensors[l]._id,data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType,data.floors[selectedFloor_id].rooms[k].nodeName,data.floors[selectedFloor_id].rooms[k].sensors[l].status,data.floors[selectedFloor_id].rooms[k].sensors[l].sensorName];
       result.push(arr);
       }
    }
  }
    res.render('iot_hum',{
      building: data,
      pic:data.floors[selectedFloor_id].floorMap,
      selected:selectedFloor_id,
      sensorlist:result,
      address:buildingaddress
    });
  })
});

//airquaility
router.get('/air', function(req, res, next) {
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
  for (var j = 0; j < data.floors.length; j++) {
   for (var k = 0; k < data.floors[j].rooms.length; k++) {
       for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
      if (data.floors[j].rooms[k].sensors[l].sensorType=="air"){
       arr=[data.floors[j].rooms[k].sensors[l]._id,data.floors[j].rooms[k].sensors[l].sensorType,data.floors[j].rooms[k].nodeName,data.floors[j].rooms[k].sensors[l].status,data.floors[j].rooms[k].sensors[l].sensorName];
       result.push(arr);
       }
    }
  }
}
    res.render('iot_air',{
      building: data,
      pic: '',
      selected:-1,
      sensorlist:result,
      address:buildingaddress
    });
  })
});

//air/floors
router.get('/air/:id', function(req, res, next) {
  selectedFloor_id = req.params.id;
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var k = 0; k < data.floors[selectedFloor_id].rooms.length; k++) {
       for (var l = 0; l < data.floors[selectedFloor_id].rooms[k].sensors.length; l++) {
      if (data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType=="air"){
       arr=[data.floors[selectedFloor_id].rooms[k].sensors[l]._id,data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType,data.floors[selectedFloor_id].rooms[k].nodeName,data.floors[selectedFloor_id].rooms[k].sensors[l].status,data.floors[selectedFloor_id].rooms[k].sensors[l].sensorName];
       result.push(arr);
       }
    }
  }
    res.render('iot_air',{
      building: data,
      pic:data.floors[selectedFloor_id].floorMap,
      selected:selectedFloor_id,
      sensorlist:result,
      address:buildingaddress
    });
  })
});

//pressure
router.get('/pre', function(req, res, next) {
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
  for (var j = 0; j < data.floors.length; j++) {
   for (var k = 0; k < data.floors[j].rooms.length; k++) {
       for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
      if (data.floors[j].rooms[k].sensors[l].sensorType=="pressure"){
       arr=[data.floors[j].rooms[k].sensors[l]._id,data.floors[j].rooms[k].sensors[l].sensorType,data.floors[j].rooms[k].nodeName,data.floors[j].rooms[k].sensors[l].status,data.floors[j].rooms[k].sensors[l].sensorName];
       result.push(arr);
       }
    }
  }
}
    res.render('iot_pre',{
      building: data,
      pic: '',
      selected:-1,
      sensorlist:result,
      address:buildingaddress
    });
  })
});

//pressure/floors
router.get('/pre/:id', function(req, res, next) {
  selectedFloor_id = req.params.id;
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var k = 0; k < data.floors[selectedFloor_id].rooms.length; k++) {
       for (var l = 0; l < data.floors[selectedFloor_id].rooms[k].sensors.length; l++) {
      if (data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType=="pressure"){
       arr=[data.floors[selectedFloor_id].rooms[k].sensors[l]._id,data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType,data.floors[selectedFloor_id].rooms[k].nodeName,data.floors[selectedFloor_id].rooms[k].sensors[l].status,data.floors[selectedFloor_id].rooms[k].sensors[l].sensorName];
       result.push(arr);
       }
    }
  }
    res.render('iot_pre',{
      building: data,
      pic:data.floors[selectedFloor_id].floorMap,
      selected:selectedFloor_id,
      sensorlist:result,
      address:buildingaddress
    });
  })
});

//lighting
router.get('/lig', function(req, res, next) {
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
  for (var j = 0; j < data.floors.length; j++) {
   for (var k = 0; k < data.floors[j].rooms.length; k++) {
       for (var l = 0; l < data.floors[j].rooms[k].sensors.length; l++) {
      if (data.floors[j].rooms[k].sensors[l].sensorType=="ligthing"){
       arr=[data.floors[j].rooms[k].sensors[l]._id,data.floors[j].rooms[k].sensors[l].sensorType,data.floors[j].rooms[k].nodeName,data.floors[j].rooms[k].sensors[l].status,data.floors[j].rooms[k].sensors[l].sensorName];
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

//lighting/floors
router.get('/lig/:id', function(req, res, next) {
  selectedFloor_id = req.params.id;
  var result=[];
  var arr=[];
  buildingModel.findOne({_id: buildingid},function(err, data){
   if(err){ return console.log(err) }
   for (var k = 0; k < data.floors[selectedFloor_id].rooms.length; k++) {
       for (var l = 0; l < data.floors[selectedFloor_id].rooms[k].sensors.length; l++) {
      if (data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType=="ligthing"){
       arr=[data.floors[selectedFloor_id].rooms[k].sensors[l]._id,data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType,data.floors[selectedFloor_id].rooms[k].nodeName,data.floors[selectedFloor_id].rooms[k].sensors[l].status,data.floors[selectedFloor_id].rooms[k].sensors[l].sensorName];
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
    arr=["Smart cluster",data.floors[j].clusterName,data.floors[j].status];
    result.push(arr);
   for (var k = 0; k < data.floors[j].rooms.length; k++) {
       arr=["Smart node",data.floors[j].rooms[k].nodeName,data.floors[j].rooms[k].status];
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
   for (var k = 0; k < data.floors[selectedFloor_id].rooms.length; k++) {
       for (var l = 0; l < data.floors[selectedFloor_id].rooms[k].sensors.length; l++) {
      if (data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType=="ligthing"){
       arr=[data.floors[selectedFloor_id].rooms[k].sensors[l]._id,data.floors[selectedFloor_id].rooms[k].sensors[l].sensorType,data.floors[selectedFloor_id].rooms[k].nodeName,data.floors[selectedFloor_id].rooms[k].sensors[l].status,data.floors[selectedFloor_id].rooms[k].sensors[l].sensorName];
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

// id/Sensor dashboard
router.get('/:id/sdashboard', function(req, res, next) {
    buildingid=req.params.id;
  bb.get_lighting_chart(buildingid,function(err, data){
    if(err){ return console.log(err) }
    var lighting=data;
    floornumber=lighting.length;
      bb.get_temperature_chart(buildingid,function(err, data1){
        if(err){ return console.log(err) }
        var temperature=data1;
         bb.get_humidity_chart(buildingid,function(err, data2){
           if(err){ return console.log(err) }
           var humidity=data2;
           bb.get_pressure_chart(buildingid,function(err, data3){
             if(err){ return console.log(err) }
             var pressure=data3;
             bb.get_air_chart(buildingid,function(err, data4){
               if(err){ return console.log(err) }
               var air=data4;
//other sensors here
              var floors=[];
              for (var i=1;i<=lighting.length;i++) {
              floors.push(("Floor "+i).toString());
   }
 res.render('sen_dashboard',{
   lighting: lighting,
   temperature:temperature,
   humidity:humidity,
   pressure:pressure,
   air:air,
   sum:floornumber,
    pic: '',
    selected:-1,
    address:"",
    floor:floors
});
});
});
});
});
});
});

// Sensor dashboard
router.get('/sdashboard', function(req, res, next) {
  bb.get_lighting_chart(buildingid,function(err, data){
    if(err){ return console.log(err) }
    var lighting=data;
      bb.get_temperature_chart(buildingid,function(err, data1){
        if(err){ return console.log(err) }
        var temperature=data1;
         bb.get_humidity_chart(buildingid,function(err, data2){
           if(err){ return console.log(err) }
           var humidity=data2;
           bb.get_pressure_chart(buildingid,function(err, data3){
             if(err){ return console.log(err) }
             var pressure=data3;
             bb.get_air_chart(buildingid,function(err, data4){
               if(err){ return console.log(err) }
               var air=data4;
//other sensors here
              var floors=[];
              for (var i=1;i<=lighting.length;i++) {
              floors.push(("Floor "+i).toString());
   }
 res.render('sen_dashboard',{
   lighting: lighting,
   temperature:temperature,
   humidity:humidity,
   pressure:pressure,
   air:air,
   sum:lighting.length,
    pic: '',
    selected:-1,
    address:"",
    floor:floors
});
});
});
});
});
});
});

// Sensor dashboard/floor
router.get('/sdashboard/:f/:id', function(req, res, next) {
  fname=req.params.id;
  floornumber=req.params.f;
  bb.get_lighting_chart_f(buildingid,fname,function(err, data,room){
    if(err){ return console.log(err) }
    var lighting=data;
      bb.get_temperature_chart_f(buildingid,fname,function(err, data1,room1,pic){
        if(err){ return console.log(err) }
    //    var temperature=data1;
         bb.get_humidity_chart_f(buildingid,fname,function(err, data2,room2){
           if(err){ return console.log(err) }
           var humidity=data2;
           bb.get_pressure_chart_f(buildingid,fname,function(err, data3,room3){
             if(err){ return console.log(err) }
             var pressure=data3;
             bb.get_air_chart_f(buildingid,fname,function(err, data4,room4){
               if(err){ return console.log(err) }
               var air=data4;
//other sensors here
 res.render('sen_dashboard_f',{
   lighting: lighting,
   temperature:data1,
   humidity:humidity,
   pressure:pressure,
   air:air,
   sum:floornumber,
    pic: pic,
    selected:fname,
    address:buildingaddress,
    troom:room1,
    hroom:room2,
    aroom:room4,
    proom:room3,
    lroom:room
});
});
});
});
});
});
});

// sensors/temperature
router.get('/stem', function(req, res, next) {
 res.render('sen_tem',{
    sum:floornumber,
    selected:-1,
  address:buildingaddress,
});
});



// sensors/temperature/chart
router.get('/stem_chart', function(req, res, next) {
  var j=req.query.floor;
  var start=req.query.start;
  var end=req.query.end;
  bb.get_temperature_chart_tf(buildingid,j,start,end,function(err, data,room){
    if(err){ return console.log(err) }
 res.render('sen_tem1',{
   start:start,
   end:end,
   data:data,
   room:room,
      sum:floornumber,
    selected:j,
  address:buildingaddress,
});
});
});

// sensors/humidity
router.get('/shum', function(req, res, next) {
 res.render('sen_hum',{
    sum:floornumber,
    selected:-1,
  address:buildingaddress,
});
});

// sensors/humidity/chart
router.get('/shum_chart', function(req, res, next) {
  var j=req.query.floor;
  var start=req.query.start;
  var end=req.query.end;
  bb.get_humidity_chart_tf(buildingid,j,start,end,function(err, data,room){
    if(err){ return console.log(err) }
 res.render('sen_hum1',{
   start:start,
   end:end,
   data:data,
   room:room,
      sum:floornumber,
    selected:j,
  address:buildingaddress,
});
});
});


// sensors/lighting
router.get('/slig', function(req, res, next) {
 res.render('sen_lig',{
    sum:floornumber,
    selected:-1,
  address:buildingaddress,
});
});

// sensors/lighting/chart
router.get('/slig_chart', function(req, res, next) {
  var j=req.query.floor;
  var start=req.query.start;
  var end=req.query.end;
  bb.get_lighting_chart_tf(buildingid,j,start,end,function(err, data,room){
    if(err){ return console.log(err) }
 res.render('sen_light1',{
   start:start,
   end:end,
   data:data,
   room:room,
      sum:floornumber,
    selected:j,
  address:buildingaddress,
});
});
});

// sensors/air
router.get('/sair', function(req, res, next) {
 res.render('sen_air',{
    sum:floornumber,
    selected:-1,
  address:buildingaddress,
});
});

// sensors/air/chart
router.get('/sair_chart', function(req, res, next) {
  var j=req.query.floor;
  var start=req.query.start;
  var end=req.query.end;
  bb.get_air_chart_tf(buildingid,j,start,end,function(err, data,room){
    if(err){ return console.log(err) }
 res.render('sen_air1',{
   start:start,
   end:end,
   data:data,
   room:room,
      sum:floornumber,
    selected:j,
  address:buildingaddress,
});
});
});

// sensors/pressure
router.get('/spre', function(req, res, next) {
 res.render('sen_pre',{
    sum:floornumber,
    selected:-1,
  address:buildingaddress,
});
});

// sensors/pre/chart
router.get('/spre_chart', function(req, res, next) {
  var j=req.query.floor;
  var start=req.query.start;
  var end=req.query.end;
  bb.get_pressure_chart_tf(buildingid,j,start,end,function(err, data,room){
    if(err){ return console.log(err) }
 res.render('sen_pre1',{
   start:start,
   end:end,
   data:data,
   room:room,
      sum:floornumber,
    selected:j,
  address:buildingaddress,
});
});
});


module.exports = router;
